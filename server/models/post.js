import xss from 'sanitizer';
import Model from '@server/models';
import SequelizeSlugify from 'sequelize-slugify';

export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    title: {
      unique: true,
      type: DataTypes.STRING,
      set(val) { this.setDataValue('title', xss.sanitize(val)); },
    },
    subtitle: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('subtitle', xss.sanitize(val)); },
    },
    excerpt: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('excerpt', xss.sanitize(val)); },
    },
    content: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('content', xss.sanitize(val)); },
    },
    authorId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM('inactive', 'active'),
    },
    view: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    seq: {
      type: DataTypes.INTEGER
    },
    slug: {
      unique: true,
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
  }, {});

  const requiredField = ['title', 'content', 'status', 'imageURL'];
  const permitFields = ['title', 'subtitle', 'excerpt', 'content', 'authorId', 'categoryId', 'status', 'view', 'imageURL'];
  const publicFields = ['uuid', 'seq', 'slug',...permitFields, 'createdAt', 'updatedAt'];

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
    Post.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  SequelizeSlugify.slugifyModel(Post, {
    source: ['title'],
  });

  Post.prototype.toJson = function (extra = {}) {
    return publicFields.reduce((obj, key) => Object.assign(obj, { [key]: this[key] }), { ...extra });
  };

  Post.getAll = (args, queryWhere = {}, extra = {}) => new Promise(async (resolve, reject) => {
    try {
      const { limit = 10, page = 1 } = args || {};
      const query = { limit: Math.abs(parseInt(limit, 10) || 10) };
      const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
      query.offset = query.limit * currentPage;
      query.where = queryWhere;
      query.attributes = publicFields;
      query.order = [['createdAt', 'desc']];
      query.include = [{
        as: 'author',
        model: Model.User,
        attributes: ['uuid', 'firstName', 'lastName'],
      }];

      if (extra.include) {
        query.include = [...query.include, ...extra.include];
      }

      const posts = await Post.findAndCountAll(query);
      resolve({
        ...posts,
        currentPage,
        totalPage: Math.ceil(posts.count / query.limit),
      });
    } catch (e) {
      reject(e);
    }
  });

  Post.getData = (uuid) => new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findOne({ where: { uuid } });
      resolve(post.toJson());
    } catch (e) {
      reject(e);
    }
  });

  Post.createData = (params = {}, currentUser = {}) => new Promise(async (resolve, reject) => {
    try {
      const emptries = requiredField.filter(key => [undefined, null, ''].includes(params[key]));

      if (emptries.length) {
        throw (emptries.reduce((obj, key) => ({ ...obj, [key]: `${key.humanize()} can't be blank` }), {}));
      }

      const permitParams = permitFields.reduce((obj, key) => [undefined, null].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});
      permitParams.authorId = currentUser.uuid;
      const post = await Post.create(permitParams);
      resolve(post.toJson());
    } catch (e) {
      reject(e);
    }
  });

  Post.updateData = (uuid, params = {}, currentUser = {}) => new Promise((resolve, reject) => {
    try {
      if (!(currentUser.role === 'admin' || currentUser.uuid === uuid)) {
        throw new Error('Permission denied');
      }

      Post
        .findOne({ where: { uuid } })
        .then((post) => {
          if (!post) {
            throw new Error('Post not found');
          }

          const permitParams = permitFields.reduce((obj, key) => [undefined].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});

          delete permitParams.uuid;
          return post.update(permitParams);
        })
        .then(post => resolve(post.toJson()))
        .catch(error => reject(error));
    } catch (e) {
      reject(e);
    }
  });

  Post.destroyData = (uuid, currentUser = {}) => new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findOne({ where: { uuid } });
      if (!post) {
        throw new Error('Post not found');
      }

      console.log(JSON.stringify(post));
      console.log(JSON.stringify(currentUser));

      if (!(currentUser.role === 'admin' || currentUser.uuid === post.authorId)) {
        throw new Error('Permission denied');
      }

      await post.destroy();
      resolve(uuid);
    } catch (e) {
      reject(e);
    }
  });

  return Post;
};

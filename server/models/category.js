import xss from 'sanitizer';
import SequelizeSlugify from 'sequelize-slugify';

export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    title: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('title', xss.sanitize(val)); },
    },
    description: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('description', xss.sanitize(val)); },
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'post',
    },
    slug: {
      unique: true,
      type: DataTypes.STRING,
    },
    seq: {
      type: DataTypes.INTEGER
    },
  });

  const requiredField = ['title'];
  const permitFields = ['title', 'description', 'type'];
  const publicFields = ['uuid', 'seq', 'slug',...permitFields, 'createdAt', 'updatedAt'];

  Category.associate = () => {
    // associations can be defined here
  };

  SequelizeSlugify.slugifyModel(Category, {
    source: ['title'],
  });


  Category.prototype.toJson = function (extra = {}) {
    return publicFields.reduce((obj, key) => Object.assign(obj, { [key]: this[key] }), { ...extra });
  };

  Category.getAll = (args, queryWhere = {}) => new Promise(async (resolve, reject) => {
    try {
      const { limit = 10, page = 1 } = args || {};
      const query = { limit: Math.abs(parseInt(limit, 10) || 10) };
      const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
      query.offset = query.limit * currentPage;
      query.where = queryWhere;
      query.attributes = publicFields;
      query.order = [['createdAt', 'desc']];

      if (parseInt(limit) === 0) {
        delete query.limit;
        delete query.offset;
      }

      const categories = await Category.findAndCountAll(query);
      resolve({
        ...categories,
        currentPage,
        totalPage: query.limit ? Math.ceil(categories.count / query.limit) : 1,
      });
    } catch (e) {
      reject(e);
    }
  });

  Category.createData = (params = {}) => new Promise(async (resolve, reject) => {
    try {
      const emptries = requiredField.filter(key => [undefined, null, ''].includes(params[key]));

      if (emptries.length) {
        throw (emptries.reduce((obj, key) => ({ ...obj, [key]: `${key.humanize()} can't be blank` }), {}));
      }

      const permitParams = permitFields.reduce((obj, key) => [undefined, null].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});
      const category = await Category.create(permitParams);
      resolve(category.toJson());
    } catch (e) {
      reject(e);
    }
  });

  Category.updateData = (uuid, params = {}, currentUser = {}) => new Promise((resolve, reject) => {
    try {
      if (currentUser.role !== 'admin') {
        throw new Error('Permission denied');
      }

      Category
        .findOne({ where: { uuid } })
        .then((category) => {
          if (!category) {
            throw new Error('Category not found');
          }

          const permitParams = permitFields.reduce((obj, key) => [undefined].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});

          delete permitParams.uuid;
          return category.update(permitParams);
        })
        .then(category => resolve(category.toJson()))
        .catch(error => reject(error));
    } catch (e) {
      reject(e);
    }
  });

  return Category;
};

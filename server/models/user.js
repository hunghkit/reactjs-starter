import xss from 'sanitizer';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import { generateToken } from '@server/helpers/jwt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      set(val) { this.setDataValue('email', xss.sanitize(val)); },
    },
    username: {
      unique: true,
      type: DataTypes.STRING,
      set(val) { this.setDataValue('username', xss.sanitize(val)); },
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('firstName', xss.sanitize(val)); },
    },
    lastName: {
      type: DataTypes.STRING,
      set(val) { this.setDataValue('lastName', xss.sanitize(val)); },
    },
    gender: {
      defaultValue: 'none',
      type: DataTypes.ENUM('male', 'female', 'none'),
    },
    role: {
      allowNull: false,
      defaultValue: 'user',
      type: DataTypes.ENUM('user', 'admin'),
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM('inactive', 'active'),
    },
    phone: {
      type: DataTypes.STRING,
    },
    loginKey: DataTypes.STRING(255),
    resetPassword: DataTypes.STRING(255),
    activationKey: DataTypes.STRING(255),
    photoURL: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    displayName: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return [this.firstName, this.lastName].join(' ').trim();
      },
    },
    seq: {
      type: DataTypes.INTEGER
    },
  }, {});

  const requiredField = ['email', 'password', 'lastName', 'firstName'];
  const permitFields = ['email', 'password', 'lastName', 'firstName', 'gender', 'role', 'status', 'gender', 'phone', 'displayName', 'dob', 'photoURL'];
  const publicFields = ['uuid', 'seq', ...permitFields, 'createdAt', 'updatedAt'];

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'authorId' });
  };

  User.prototype.toJson = function (extra = {}) {
    return publicFields.reduce((obj, key) => Object.assign(obj, { [key]: this[key] }), { ...extra });
  };

  User.getAll = (args, queryWhere = {}, currentUser = {}) => new Promise(async (resolve, reject) => {
    try {
      if (currentUser.role !== 'admin') {
        throw new Error('Permission denied');
      }

      const { limit = 10, page = 1 } = args || {};
      const query = { limit: Math.abs(parseInt(limit, 10) || 10) };
      const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
      query.offset = query.limit * currentPage;
      query.where = queryWhere;
      query.attributes = publicFields;
      query.order = [['createdAt', 'desc']];

      const users = await User.findAndCountAll(query);
      resolve({
        ...users,
        currentPage,
        totalPage: Math.ceil(users.count / query.limit),
      });
    } catch (e) {
      reject(e);
    }
  });

  User.authenticate = (params) => new Promise((resolve, reject) => {
    const { email, password } = params || {};

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user || !bcrypt.compareSync(password, user.password || '')) {
          throw { message: 'Authentication failed. Invalid user or password.' };
        }

        resolve(user.toJson({ token: generateToken({ loginKey: user.loginKey }) }));
      })
      .catch(err => reject(err));
  });

  User.register = (params = {}) => new Promise((resolve, reject) => {
    User.findOne({ where: { email: params.email || '' } })
      .then((user) => {
        if (user) {
          throw { email: 'Email has taken' };
        }

        const emptries = [...requiredField, 'confirmPassword'].filter(key => [undefined].includes(params[key]));

        if (emptries.length) {
          throw (emptries.reduce((obj, key) => ({ ...obj, [key]: `${key.humanize()} can't be blank` }), {}));
        }

        if (params.confirmPassword !== params.password) {
          throw { confirmPassword: 'Confirm password need to map password' };
        }

        const permitParams = permitFields.reduce((obj, key) => [undefined, null].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});
        permitParams.loginKey = randomstring.generate(40);
        permitParams.password = bcrypt.hashSync(permitParams.password, 10);

        return User.create(permitParams);
      })
      .then(user => resolve(user.toJson({ token: generateToken({ loginKey: user.loginKey }) })))
      .catch(err => reject(err));
  });

  User.updateData = (uuid, params = {}, currentUser = {}) => new Promise((resolve, reject) => {
    try {
      if (!(currentUser.role === 'admin' || currentUser.uuid === uuid)) {
        throw new Error('Permission denied');
      }

      User
        .findOne({ where: { uuid } })
        .then((user) => {
          if (!user) {
            throw new Error('User not found');
          }

          if (user.password && !bcrypt.compareSync(params.oldPassword, user.password)) {
            throw new Error('Authentication failed');
          }

          if (params.password && params.password !== params.confirmPassword) {
            throw new Error('Confirm password need to map password');
          }

          const permitParams = permitFields.reduce((obj, key) => [undefined].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});

          if (permitParams.password) {
            permitParams.loginKey = randomstring.generate(40);
            permitParams.password = bcrypt.hashSync(permitParams.password, 10);
          } else {
            delete permitParams.password;
          }

          delete permitParams.uuid;
          delete permitParams.email;

          return user.update(permitParams);
        })
        .then(user => resolve(user.toJson()))
        .catch(error => reject(error));
    } catch (e) {
      reject(e);
    }
  });

  return User;
};

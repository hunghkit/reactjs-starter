export default (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    key: DataTypes.STRING,
    value: DataTypes.JSONB,
    active: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  });

  const permitFields = ['value', 'active'];

  Option.getAll = (key, args, queryWhere = {}) => new Promise(async (resolve, reject) => {
    try {
      const { limit = 10, page = 1 } = args || {};
      const query = { limit: Math.abs(parseInt(limit, 10) || 10) };
      const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
      query.offset = query.limit * currentPage;
      query.where = queryWhere;
      query.where.active = true;

      const options = await Option.findAndCountAll(query);
      resolve({
        ...options,
        currentPage,
        totalPage: Math.ceil(options.count / query.limit),
      });
    } catch (e) {
      reject(e);
    }
  });

  Option.getBy = (key) => new Promise(async (resolve, reject) => {
    try {
      resolve(await Option.findOne({ where: { key } }));
    } catch (e) {
      reject(e);
    }
  });

  Option.getBys = (key) => new Promise(async (resolve, reject) => {
    try {
      const option = await Option.findAll({ where: { key } });

      resolve(option);
    } catch (e) {
      reject(e);
    }
  });

  Option.createData = (key, value) => new Promise(async (resolve, reject) => {
    try {
      const option = await Option.create({
        key,
        value,
        active: true,
      });

      resolve(option);
    } catch (e) {
      reject(e);
    }
  });

  Option.updateData = (uuid, key, params = {}, currentUser = {}) => new Promise(async (resolve, reject) => {
    try {
      if (currentUser.role !== 'admin') {
        throw new Error('Permission denied');
      }

      const option = await Option.findOne({ where: { uuid, key } });

      if (!option) {
        throw new Error('Option not found');
      }

      const permitParams = permitFields.reduce((obj, key) => [undefined].includes(params[key]) ? obj : ({ ...obj, [key]: params[key] }), {});
      resolve(await option.update(permitParams));
    } catch (e) {
      reject(e);
    }
  });


  Option.destroyData = (uuid, currentUser = {}) => new Promise(async (resolve, reject) => {
    try {
      const option = await Option.findOne({ where: { uuid } });
      if (!option) {
        throw new Error('Option not found');
      }

      if (currentUser.role !== 'admin') {
        throw new Error('Permission denied');
      }

      await option.destroy();
      resolve(uuid);
    } catch (e) {
      reject(e);
    }
  });

  return Option;
};

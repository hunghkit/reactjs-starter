const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/db.js')[process.env.NODE_ENV || 'development'];

const basename = path.basename(__filename);
const sequelize = config.use_env_variable ? new Sequelize(config[config.use_env_variable]) : new Sequelize(config.database, config.username, config.password, config);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name.humanize()] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate({ })
  .then(() => {
    console.log('Connected Db!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
module.exports = db;

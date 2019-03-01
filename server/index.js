process.env.BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
require('@babel/register');
require('@babel/polyfill');
const moduleAlias = require('module-alias');

if (process.env.CLOUDINARY_URL) {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config();
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line
}

moduleAlias.addAlias('@server', __dirname);

module.exports = process.env.BE ? require('./be.js') : process.env.FE ? require('./fe.js') : require('./setup.js');

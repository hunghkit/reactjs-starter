process.env.BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
require('@babel/register');
require('@babel/polyfill');

if (process.env.CLOUDINARY_URL) {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config();
}

const moduleAlias = require('module-alias');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line
}

moduleAlias.addAlias('@server', __dirname);
module.exports = require('./setup.js');

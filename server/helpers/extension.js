process.env.BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();
require('./prototype.js');

const moduleAlias = require('module-alias');

moduleAlias.addAlias('@server', '../', __dirname);

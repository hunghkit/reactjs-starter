
const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');
const { parsed: localEnv } = require("dotenv").config({ path: path.resolve(process.cwd(), '.env.local') }) || {};

module.exports = {
  ...withSass(withCSS({
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv || {}));
      return config;
    },
  })),
  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 10,
  },
};

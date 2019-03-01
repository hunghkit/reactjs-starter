const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const webpack = require("webpack");

let localEnv = {};
if (process.env.NODE_ENV !== 'production') {
  localEnv = (require("dotenv").config() || {}).parsed || {};
}

module.exports = {
  ...withSass(withCSS({
    publicRuntimeConfig: {
      staticFolder: '/public',
    },
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
  })),
  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 10,
  },
};

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = {
  ...withSass(withCSS({
    publicRuntimeConfig: {
      staticFolder: '/public',
    },
  })),
  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 10,
  },
};

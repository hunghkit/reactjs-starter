const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = {
  ...withSass(withCSS()),
  onDemandEntries: { // This governs the behavior of the development server ONLY
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 5 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 10,
  },

};

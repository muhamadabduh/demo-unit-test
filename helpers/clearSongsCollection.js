/**
 *
 * Warning! This function was created for testing purposes, make sure you have
 * configured your environment to `test` mode
 *
 */

const clearSongsCollection = function() {
  const Song = require("../models/Song");

  return Song.deleteMany({});
};

module.exports = clearSongsCollection;

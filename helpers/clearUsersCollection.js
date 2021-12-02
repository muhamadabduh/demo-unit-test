/**
 *
 * Warning! This function was created for testing purposes, make sure you have
 * configured your environment to `test` mode
 *
 */

const clearUsersCollection = function() {
  const User = require('../models/User');

  return User.deleteMany({});
}

module.exports = clearUsersCollection;

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/pings';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAll: getAll,
  getSinglePing: getSinglePing,
  createPing: createPing,
  removePing: removePing
};

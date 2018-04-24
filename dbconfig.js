var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionstring = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'upvote',
    user: 'upvoteuser',
    password: 'upvoteuser'
};

var db = pgp(connectionstring);

module.exports =  db;

var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionstring = {
    host: 'ec2-54-246-84-200.eu-west-1.compute.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'd9setko6ee7es3',
    user: 'yqncyvhhhxolom',
    password: 'a0780cb77d6e29d0eece2a66dbba193aef6b74cd555f2c230cde5868ba18fe43',
    ssl: true
};
var db = pgp(connectionstring);

module.exports =  db;

/**
 * Created by greg on 2015.10.11..
 */

var mysql = require('mysql');
var q = require('q');
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var LOG_PREFIX = '[CONN] - ';

function getConnection() {
    var deferred = q.defer();

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: config.username,
        password: config.password,
        database: config.database
    });

    connection.connect(function (err) {
        if (err) {
            console.error(err);
            deferred.reject(err);
        }

        console.log(LOG_PREFIX + 'Connection created with id:' + connection.threadId);
        deferred.resolve(connection);
    });

    return deferred.promise;
}

function prepareQuery(query, parameters){
    if(!query || !parameters) {
        throw  new Error('query and parameters function parameters should be specified.');
    }
    return mysql.format(query, parameters);
}

module.exports = {
    getConnection : getConnection,
    prepareQuery: prepareQuery
};
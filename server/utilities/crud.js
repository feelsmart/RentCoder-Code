var configGeneral = require('./server/config/config.js');

module.exports = {
    get: function (query, params, callback) {
        // logic to write get stmt
        // for db query reference use -- configGeneral.QUERY_REFERENCE
    },
    
    create: function (query, params, callback) {
        // logic to write create stmt
        // for db query reference use -- configGeneral.QUERY_REFERENCE
    },

    insert: function (query, params, callback) {
        // logic to write insert stmt
        // for db query reference use -- configGeneral.QUERY_REFERENCE
    },

    update: function (query, params, callback) {
        // logic to write update stmt
        // for db query reference use -- configGeneral.QUERY_REFERENCE
    },

    delete: function (query, params, callback) {
        // logic to write delete stmt
        // for db query reference use -- configGeneral.QUERY_REFERENCE
    }
};
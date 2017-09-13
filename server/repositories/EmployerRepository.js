/***
 * Author: Suresh
 * Date: 14/01/2016
 * Employer repository, contains functions to query and modify the Employer Info 
 * collection
 */

var models = require('../models');


/**
 * Insert or update Employer Info
 * 
 * @param {Object} category
 * @param {Object} callback
 */
function create(category, callback) {
    models.employer.upsert(category).then(function (data) {
        return callback(false, data);
    }).catch(function (error) {
        return callback(error, false);
    });
}
exports.create = create;

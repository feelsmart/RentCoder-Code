var Models = require('../models');


/**
 * get Settings List
 * 
 * @param {int} pageno
 * @param {int} pagesize
 * @param {Object} callback
 */
function findAll(callback) {
    Models.settings.findAll().then(function (data) {
        return callback(false, data);
    }).catch(function (error) {
        return callback(error, false);
    });
}

/**
 * get Settings by id
 * 
 * @param {int} settingsID
 * @param {Object} callback
 */
function findByID(settingsID, callback) {
    Models.settings.findAll({
        where: {
            SettingsID: settingsID
        }
    }).then(function (data) {
        return callback(false, data);
    }).catch(function (error) {
        console.log(error);
        return callback(error, false);
    });
}

exports.findAll = findAll;
exports.findByID = findByID;
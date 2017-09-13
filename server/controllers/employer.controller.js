/***
 * Author: Suresh
 * Date: 15/11/2016
 * This class contains all the methods to handle Resident related requests
 */

var models = require('../models'),
    indicative = require('indicative'),
    validationMessages = require('../utilities/messages'),
    validationrules = require('../utilities/validationrules'),
    employerRepository = require('../repositories/EmployerRepository'),
    settingsRepository = require('../repositories/SettingsRepository'),
    utility = require('../utilities/common');
    var util = require('../utilities/util');
    var randomstring = require('randomstring');
    var constants = require('../utilities/constants.json');
    var generalConfig = require('../config/config.js');
    var bcrypt = require('bcrypt-nodejs');

//******************************************REGISTER EMPLOYER RULES DEFINE START******************************************/
module.exports = {

    createEployerInfo: function (req, res) {
        req.logger.trace('Begin createEmployerInfo');
        var employer = req.body;
        employerRepository.create(employer, function (error, data) {
            if (!error) {
               
               util.sendMailtoEmployer(employer, function (error, data){
                  if(!error)
                  {
                      util.sendMailNotification(employer, function (error, data){
                        if(!error)
                        {

                            utility.buildCreateResponse(req, false, data, 'createEmployerInfo', '', res);    
                        }
                        else
                        {
                            utility.buildCreateResponse(req, true, data, 'createEmployerInfo', '', res);      
                        }
                     });
                  
                  }
                else
                {
                utility.buildCreateResponse(req, true, data, 'createEmployerInfo', '', res);      
                }
               }); 
            }
            else {
                utility.buildCreateResponse(req, true, data, 'createEmployerInfo', '', res);
            }
        });
    }
}
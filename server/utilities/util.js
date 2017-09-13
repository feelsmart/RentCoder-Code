var generalConfig = require('../config/config.js');
var fs = require('fs');
var constants = require('../utilities/constants.json');
var mailConfig = require('../config/mail.config.json');
var API_KEY = fs.readFileSync(mailConfig.MAIL_SERVER_CONFIG.KEY.toString());
var bcrypt = require('bcrypt-nodejs');
var messages = require('../utilities/util.js');
module.exports = {
    getBcryptedPwd: function (toBeEncrypted, callback) {
        bcrypt.hash(toBeEncrypted, null, null, function (err, hash) {
            callback(hash);// Store hash in your password DB.
        });
    },

sendMailtoEmployer: function (mailOptions, callback) {
        var mailConfiguration = '';
        mailConfiguration = mailConfig.MAIL_TEMPLATES.ACTIVATE_ACCOUNT;
        if (mailConfiguration.SUBJECT !== undefined) {
            mailOptions.subject = mailConfiguration.SUBJECT;
        }
        if (mailConfiguration.FROM !== undefined) {
            mailOptions.from = mailConfiguration.FROM;
        }
        fs.readFile(mailConfiguration.HTML, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                var helper = require('sendgrid').mail,
                from_email = new helper.Email(mailOptions.from),
                to_email = new helper.Email(mailOptions.Email),
                subject = mailOptions.subject,
                data =  data.replace('@name', mailOptions.Name)
                content = new helper.Content("text/html", data),
                mail = new helper.Mail(from_email, subject, to_email, content);
                var sg = require('sendgrid')(API_KEY);
                var requestBody = mail.toJSON();
                var request = sg.emptyRequest();
                request.method = 'POST';
                request.path = '/v3/mail/send';
                request.body = requestBody;
                sg.API(request, function (error, response) {
                    if (!error) {
                        console.log(response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                        callback(false,response.statusCode);
                    } else {
                        callback(error,null);
                    }
                });
            } else {
                console.log(err);
            }
        });
    },

sendMailNotification: function (mailOptions,  callback) {
        var mailConfiguration = '';
        mailConfiguration = mailConfig.MAIL_TEMPLATES.MAIL_NOTIFICATION;
        if (mailConfiguration.SUBJECT !== undefined) {
            mailOptions.subject = mailConfiguration.SUBJECT;
        }
        if (mailConfiguration.TO !== undefined) {
            mailOptions.to = mailConfiguration.TO;
        }

        fs.readFile(mailConfiguration.HTML, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                var helper = require('sendgrid').mail,
                from_email = new helper.Email(mailOptions.Email),
                to_email = new helper.Email(mailOptions.to),
                subject = mailOptions.subject,
                data =  data.replace('@name', mailOptions.Name)
                data =  data.replace('@Technology', mailOptions.Technologies)
                data =  data.replace('@Experience', mailOptions.Experience)
                data =  data.replace('@Contact', mailOptions.PhoneNo)
                data =  data.replace('@Email', mailOptions.Email)
                data =  data.replace('@EmployementType', mailOptions.EmployementType)
                data =  data.replace('@name', mailOptions.Name)
                content = new helper.Content("text/html", data),
                mail = new helper.Mail(from_email, subject, to_email, content);
                var sg = require('sendgrid')(API_KEY);
                var requestBody = mail.toJSON();
                var request = sg.emptyRequest();
                request.method = 'POST';
                request.path = '/v3/mail/send';
                request.body = requestBody;
                sg.API(request, function (error, response) {
                    if (!error) {
                        console.log(response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                        callback(false,response.statusCode);
                    } else {
                        callback(response.statusCode,null);
                    }
                });
            } else {
                console.log(err);
            }
        });
    },
    emailActivationLink: function (user, actionMethod, urlAction, mailLogo) {
        // setup e-mail data with unicode symbols
        var baseURI = generalConfig.BASE_URI;
        if (global.BASE_URI !== undefined && global.BASE_URI !== null) {
            baseURI = global.BASE_URI;
        }
        var mailOptions = {
            to: user.email
        };
        var templateData = {
            action: actionMethod,
            name: user.FirstName + " " + user.LastName,
            url: baseURI + "/#/" + urlAction + "?email=" + user.email +  "&code=" + user.RandomCode,
            careplanLogo: baseURI + generalConfig.CAREPLAN_LOGO,
            mailLogo: baseURI + mailLogo,
            newPassword: user.newPassword
        };
        console.log("URL:: " + templateData.url);
        module.exports.sendMail(mailOptions, templateData, function (code) {
            if (code === 202) {
                logger.trace("mail sent succesfully");
            }
        });
    },

    validateInputParamsUpdatePassword: function (user, callback) {
        if (user.password !== user.confirmPassword) {
            callback(messages.PASSWORD_MATCH_VALIDATION);
        }
        else {
            callback("");
        }
    }

}
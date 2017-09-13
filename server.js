var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    log4js = require('log4js'),
    
    configGeneral = require('./server/config/config.js'),
    // connection = require('./server/utilities/connection'),
    request = require("request"),
    https = require('https'),
    utility = require('./server/utilities/common'),
//    var jwt = require('jsonwebtoken');
    messages = require('./server/utilities/messages.json');

//TLS
var options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
};

var server = https.createServer(options, app);



// use body parser
app.use(bodyParser());

// set up the database connection here


// set up logger useing log4js
log4js.configure(__dirname + '/server/config/log4js.config.json', {});
logger = log4js.getLogger('Careplan');
logger.setLevel('TRACE'); //trace/debug/info/warn/error/fatal

// define macros kind of static storage
app.use('/client', express.static(__dirname + '/client/'));
app.use('/js', express.static(__dirname + '/client/js/'));
app.use('/views', express.static(__dirname + '/client/views/'));
app.use('/css', express.static(__dirname + '/client/css/'));
app.use('/images', express.static(__dirname + '/client/images/'));
app.use('/font', express.static(__dirname + '/client/fonts/'));


response_object = {
    error: false,
    success: true,
    message: "",
    data: {}
};

/********************************** WRITE THE APIs THAT ANY USER CAN ACCESS HERE **********************************/


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});

/******************************* LOGIC THAT VERIFIES THE TOKEN *************************************/
// route middleware to verify a token
app.use(function (req, res, next) {
    req.logger = logger;
    var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info("Requested API: " + req.method + " - " + full_url);
     next();
    // // check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // // decode token
    // if (token) {
    //     // verifies secret and checks exp
    //     jwt.verify(token, configGeneral.SECRET_KEY_JWT, function (err, decoded) {
    //         if (err) {
    //             logger.error("Server:: " + err.name + ": " + err.message);
    //             utility.buildGetResponse(req, err, {}, 'Authenticate', messages.TOKEN_EXPIRED, res);
    //         } else {
    //             // if everything is good, save to request for use in other routes
    //             logger.info("Server:: Token verified...");
    //             req.decoded = decoded;
    //             res.setHeader('x-access-token', token);
    //             next();
    //         }
    //     });
    // } else {
    //     // if there is no token return an error
    //     logger.warn("Server:: No token");
    // }
});


/**************************** WRITE THE APIs THAT ONLY AUTHENTICATED USER CAN ACCESS HERE **************************/


server.listen(configGeneral.PORT, function () {
    logger.info('server up and running at %s port', configGeneral.PORT);
    logger.info('process.env.NODE_ENV : ' + process.env.NODE_ENV);
});

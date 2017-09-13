module.exports = {
    /**
     * Summary: This methos is used to build the response object for each request, so this needs to be call in every API.
     * @params: isError - boolean - represents if response to be sent is error
     *          isSuccess - boolean - represents if response to be sent is success
     *          message - string - represents response message to be sent
     *          data - Object - represents response data
     *          totalcount - Number - represents the total number of records in the response(usually used in GET)
     * Returns: response_object - Object - response for the request
     */
    // buildResponse: function (isError, isSuccess, message, data, totalcount) {
    //     response_object.error = isError;
    //     response_object.success = isSuccess;
    //     response_object.message = message;
    //     response_object.data = data;
    //     response_object.totalcount = totalcount;
    //     return response_object;
    // }

    buildGetResponse: function (req, err, data, funName, message, res) {
        if (err) {
            var msg = 'An error has occurred while processing a request to retrieve' + message;
            req.logger.error(err);
            response_object.data = data;
            response_object.error = true;
            response_object.success = false;
            response_object.message = msg;
            
            req.logger.trace('End ' + funName);
            //   return response_object;
            res.status(400).send(response_object);
        }
        else {
            if ( data !=null && ( (data.rows == undefined && (data.dataValues !=undefined || data.length > 0)  ) || (data.rows != undefined && data.rows.length > 0))) {
                response_object.data = data;
                response_object.success = true;
                 response_object.error = false;
                 response_object.message = '';
                req.logger.trace('End ' + funName);
                //return response_object;
                res.send(response_object);
            }
            else {
                var msg = 'Could not retrieve ' + message + ', data not found';
                req.logger.info(msg + '. Request from address ' + req.connection.remoteAddress + '.');
                response_object.error = true;
                response_object.success = false;
                response_object.message = msg;
                response_object.data = null;
                req.logger.trace('End ' + funName);
                ///return response_object;
                res.send(response_object);
            }
        }
    },

    buildCreateResponse: function (req, error, data, funName, message, res) {
        if (error) {
            req.logger.error(error);
            var msg = 'An error has occurred while processing a request to create' + message;
            req.logger.error(error);
            response_object.error = true;
            response_object.success = false;
            response_object.message = msg;
            response_object.data = null;
            req.logger.trace('End ' + funName);
            res.status(400).send(response_object);
        }
        else {
            response_object.error = false;
            response_object.success = true;
            response_object.message = message + ' has been created/Modified.';
            response_object.data = data;
            req.logger.trace('End ' + funName);
            res.send(response_object);
        }
    },
};
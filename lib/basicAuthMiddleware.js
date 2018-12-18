
'use strict';

const basicAuth = require('basic-auth');

module.exports = (name, pass) => {
    return (req, res, next) => {
        //load user credentials if any
        const credentials = basicAuth(req);

        if (!credentials || credentials.name !== name || credentials.pass !== pass) {
            res.set('WWW-Authenticate', 'Basic realm = You have to authenticate');
            res.status(401).send();
            return; // It isn´t authenticated
        }
        next(); //It´s authenticated
    } 
}
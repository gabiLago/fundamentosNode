'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const i18n = require('i18n');

const Usuario = require('../../models/Usuario');

/** 
 * POST /usuarios/login
 * Authenticates a user via POST
 */

router.post('/', (req, res, next) => {
    i18n.init(req, res); // Initializes translation

    try {
        // Entry data
        const email = req.body.email;
        const password = req.body.password;

        // DB query searching the user received matching email
        Usuario.findOne({ email: email }, function(err, usuario) {
            if (err) throw err;

            // Check if user exists on DB  
            if (!usuario) {
                res.status(401).json({ success: false, error: res.__('Invalid credentials')}); 
                return;
            }

            // test a matching password using method defined in the model
            usuario.comparePassword(password, function(err, match) {
                if (err) throw err;

                if (!match){
                    res.status(401).json({ success: false, error: res.__('Invalid credentials')});
                    return;
                }

                // Token creation
                jwt.sign({ user_id: usuario._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION }, (err, token) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    // If login is succesful a valid token is sent in the response
                    res.json({ success: true, result: token });
                });
            });
        });

    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;





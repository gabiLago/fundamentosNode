'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/Usuario');
const dotenv = require('dotenv').config()

/** 
 * POST /users/signup
 * Registers a new User coming from POST data
 */
router.post('/', async (req, res, next) => {

    // Entry data
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        nombre: nombre,
        email: email, 
        password: password // Password will be hashed before saved on db due a pre middleware function on models/Usuario
    });

    newUser.save(function (err, userCreated) {
        if (err) throw err;

        console.log('New User ' + userCreated.nombre + ' created');
        res.json({success: true, result: userCreated.nombre})
    });      
});
  
module.exports = router;



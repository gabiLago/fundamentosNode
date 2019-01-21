'use strict';

const express = require('express');
const router = express.Router();
const i18n = require('i18n');
const i18nConfig = require('../../lib/i18nConfig');

const User = require('../../models/Usuario');
const dotenv = require('dotenv').config()

/** 
 * POST /users/signup
 * Registers a new User
 */

router.post('/', async (req, res, next) => {
  i18n.init(req, res); // Initializes translation

  try{
    // Entry data
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        nombre: nombre,
        email: email, 
        password: password // Password will be hashed before saved on db due a pre middleware function on models/Usuario
    });

    await newUser.save( function (err, userCreated) {
      //console.log(err.errors);  
      if (err) {
          console.log(err.errors);
          // Validation errors coming from mongoose
          let errMsg;           
          if (err.errors.nombre) errMsg = err.errors.nombre.properties.message;
          if (err.errors.email) errMsg = err.errors.email.properties.message;
          if (err.errors.password) errMsg = err.errors.password.properties.message;

          res.status(422).json({success: false, result: res.__(errMsg)})
          return;
        } 

        console.log('New User ' + userCreated.nombre + ' created');
        res.json({success: true, result: userCreated.nombre})
    });
  } catch(err){
      next(err);
      return;
  }      
});
  
module.exports = router;



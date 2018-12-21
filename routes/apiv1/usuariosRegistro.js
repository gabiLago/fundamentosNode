'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/Usuario');
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt');


/** 
 * POST /users/signup
 * Registers a new User coming from POST data
 */
router.post('/', async (req, res, next) => {

    // Entry data
    const nombre = req.body.nombre;
    const email = req.body.email;
    const passwd = req.body.passwd;

    /**
     * User data stored on DB
     * Password hashed through bcrypt
     */
    bcrypt.hash(passwd, parseInt( process.env.BCRYPT_SALT_ROUNDS ), function(err, hash) {
        if (err) throw err;
        
        try {
          const newUser = new User({
              nombre: nombre,
              email: email, 
              passwd: hash // hashed email
          });

          newUser.save(function (err, userCreated) {
            if (err) throw err;

            console.log('New User ' + userCreated.nombre + ' created');
            res.json({success: true, result: userCreated.nombre})
          });

        } catch(err) {
          next(err);
          return;
        }
    });
});
  
module.exports = router;



'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/** 
 * POST /users/signup
 * Registers a new User coming from POST data
 */
router.post('/', async (req, res, next) => {

    // Entry data
    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;

    /**
     * User data stored on DB
     * Password hashed through bcrypt
     */
    bcrypt.hash(passwd, saltRounds, function(err, hash) {
        if (err) throw err;
        
        try {
          const newUser = new User({
              name: name,
              email: email, 
              passwd: hash // hashed email
          });

          newUser.save(function (err, userCreated) {
            if (err) throw err;

            console.log('New User ' + userCreated.name + ' created');
            res.json({success: true, result: userCreated.name})
          });

        } catch(err) {
          next(err);
          return;
        }
    });
});
  
module.exports = router;



'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

//TODO module.exports = router está dos veces ¿Está bien?

/** 
 * POST /users/login
 * Autentica un usuario
 */
router.post('/login', async (req, res, next) => {
  try {
    
    // Entry data
    const email = req.body.email;
    const passwd = req.body.passwd;

    // DB query searching the user received
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      res.json({ success: false, error: 'invalid credentials'});
      return;
    }

    if (passwd !== user.passwd) {
      res.json({ success: false, error: 'invalid credentials'});
      return;
    }

    // Token creation
    jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ success: true, result: token });
    });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;



router.post('/login', async (req, res, next) => {
    try {
        const Reqemail = req.body.email;
        const passwd = req.body.passwd;

        // DB Search
        const user = await User.findOne( {email: Reqemail } ).exec();
        console.log(user);

    if (!user) {
        res.json({ success: false, error: 'invalid email credentials'});
        return; //Invalid User
    }

    if(passwd !== user.passwd) {
        res.json({ success: false, error: 'invalid passwd credentials'});
        return; //Invalid password
    }

    // Valid credentials, generate new token
    jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRATION
    }, (err, token) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: token})
    });

    } catch(err) {
        next(err);
        return;
    }    
});


module.exports = router;



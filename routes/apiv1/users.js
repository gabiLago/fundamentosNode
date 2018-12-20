'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const i18n = require('i18n');
const i18nConfig = require('../../lib/i18nConfig');

const User = require('../../models/User');

/** 
 * POST /users/login
 * Autentica un usuario
 */
router.post('/login', async (req, res, next) => {
  i18n.init(req, res);

  try {
    // Entry data
    const email = req.body.email;
    const passwd = req.body.passwd;

    // DB query searching the user received
    const user = await User.findOne({ email: email }).exec();

    // Check if user exists on DB  
    if (!user) {
      res.json({ success: false, error: res.__('Invalid credentials')});
      return;
    }

    // Check password, we call to bcrypt to compare password entered by POST with hashed one stored on DB
    const match = await bcrypt.compare(passwd, user.passwd);

    if (!match) {
      res.json({ success: false, error: res.__('Invalid credentials')});
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

      // If login is succesful a valid token is sent
      res.json({ success: true, result: token });
    });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;





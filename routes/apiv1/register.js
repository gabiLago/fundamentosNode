'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

/** 
 * POST /users/login
 * Autentica un usuario
 */
router.post('/', async (req, res, next) => {

    // Entry data
    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;

  try {
    
    const newUser = new User({
      name: name,
      email: email,
      passwd: passwd
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

module.exports = router;



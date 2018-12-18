'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:   { type: String, index: true },
    email:  { type: String, index: true },
    passwd: { type: String } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;

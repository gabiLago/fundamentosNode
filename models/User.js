'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, index: true },
    email: { type: String, index: true },
    passwd: String
});

const User = mongoose.model('User', adSchema);

module.exports = User;

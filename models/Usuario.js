'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const UsuarioSchema = mongoose.Schema({
    nombre:   { 
        type: String, 
        index: true,
        required: true
    },
    email:  { 
        type: String, 
        index: true,
        required: true
    },
    password: { 
        type: String, 
        required: true
    } 
});


// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
UsuarioSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS), function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UsuarioSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;

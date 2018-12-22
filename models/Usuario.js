'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');


let validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

const UsuarioSchema = mongoose.Schema({
    nombre:   { 
        type: String, 
        index: true,
        required: true
    },
    email:  { 
        type: String, 
        index: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match:  [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']
        // Regex from https://emailregex.com/ that asures that validates 99.99% of properly formed emails.
    },
    password: { 
        type: String, 
        required: true
    } 
});


// We have followed http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt to use bcypt in a pre middleware function
UsuarioSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS), function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

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

'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
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
    passwd: { 
        type: String,
        required: [true, 'Password required']   
    } 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

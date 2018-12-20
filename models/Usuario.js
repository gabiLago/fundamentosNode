'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre:   { type: String, index: true },
    email:  { type: String, index: true },
    passwd: { type: String } 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: Boolean,
    precio: Number,
    foto: String, 
    tags: { type: [String], index: true }
});


const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;

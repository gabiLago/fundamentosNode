'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
	nombre: { 
		type: String, 
		index: true 
	},
	venta: {
		type: Boolean,
		index: true
	},
	precio: Number,
	foto: String,           
	tags: { 
		type: [String], 
		enum: ['lifestyle', 'work', 'mobile', 'motor'],
		index: true 
	}
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;

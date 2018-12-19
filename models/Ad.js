'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: { type: String, index: true },
    sale: Boolean,
    price: Number,
    img: String, 
    tags: { type: [String], index: true }
});


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;

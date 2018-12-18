'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    img: String, 
    tags: [String]
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;

'use strict';

const mongoose = require('mongoose');

const addSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    img: String, 
    tags: [String]
});

const Add = mongoose.model('Add', addSchema);

module.exports = Add;

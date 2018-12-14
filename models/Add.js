'use strict';

const mongoose = require('mongoose');

//Define Schema
const addSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    img: String, 
    tags: [String]
});

//Create the model
const Add = mongoose.model('Add', addSchema);

//Export the model
module.exports = Add;
'use strict';

/**
 * Mongoose Connection
 */

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Connection error', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB on', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepopTest', { useNewUrlParser: true });

module.exports = mongoose.connection;
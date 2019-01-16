'use strict';
/**
 * Mongoose Connection
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.connection.on('error', (err) => {
	console.log('Connection error', err);
	process.exit(1);
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB on', mongoose.connection.name);
});

mongoose.connect(process.env.MONGOOSE_CONNECTION_CHAIN, { 
	useNewUrlParser: true,  // Avoids drepecation warnings from MongoDB driver
	useCreateIndex: true    // https://mongoosejs.com/docs/deprecations.html
}); 

module.exports = mongoose.connection;
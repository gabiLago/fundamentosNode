'use strict';

const express = require('express');
const mongoose = require ('./connectMongoose.js');
const fs = require('fs');
const dotenv = require('dotenv').config()

const Anuncio = require ('./../models/Anuncio.js');
const Usuario = require ('./../models/Usuario.js');
let sampleAd;

/**
 * Initializes MongoDB database using Mongoose.
 * Cleans any previous data on modeled collections.
 * Adds sample data of ads and a test user in their collections.
 */

// We use async-await promises to make sure the collection is cleaned before adding any sample data
Anuncio.deleteMany( {}, async function(err) { 
	if(err) throw err;
		console.log('Ads collection cleaned') 

	// Now we can read the file and save the ads data on DB
	await fs.readFile( __dirname + '/anuncios.json', 'utf8', async (err, data) => {
		if (err) throw err;
		const jsonFile = await JSON.parse(data);
		const jsonArray = jsonFile["anuncios"];

		jsonArray.forEach(function(elem){  
			sampleAd = new Anuncio(elem);
			sampleAd.save(function (err, AdCreated) {
				if (err) throw err;
				console.log('Ad ' + AdCreated.nombre + ' created');                
			});
		});
	});
}); 


// We do the same with users collection, creating the test user defined in .env
Usuario.deleteMany({}, async function(err) {
	if (err) throw err 
	console.log('Users collection cleaned')    

	try{
		const newUser = new Usuario({
			nombre: process.env.TEST_NAME, 
			email: process.env.TEST_EMAIL, 
			password: process.env.TEST_PASSWD
		});
			
		await newUser.save(function (err, UserCreated) {
			if (err) throw err;
			console.log('User ' + UserCreated.nombre + ' created');
		});

	} catch (err){
		next(err);
		return;
	}  
});
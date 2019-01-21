'use strict';

const express = require('express');
const mongooseConn = require ('./connectMongoose.js');
const fs = require('fs');
const dotenv = require('dotenv').config()

const Anuncio = require ('./../models/Anuncio.js');
const Usuario = require ('./../models/Usuario.js');

/**
 * Initializes MongoDB database using Mongoose.
 * Cleans any previous data on modeled collections.
 * Adds sample data of ads and a test user in their collections.
 */

function cleanAndPopulateJSON(model, file){
	fs.readFile(file, 'utf8', async (err, data) => {
		if (err) throw err;
		try{
			const jsonFile = await JSON.parse(data);	
			const jsonArray = jsonFile[Object.keys(jsonFile)[0]];
			const send = await cleanAndPopulate(model, jsonArray);
		} catch(err){
			console.log(err);
			return res.send('Error parsing or sending JSON');
		}
	});
}

function cleanAndPopulate(model, list){
	model.deleteMany( {}, async function(err) { 
		if(err) throw err;
		console.log('Collection cleaned')
		try {
	  		await model.create(list, function (err, temps) {
				if (err) throw err;
				console.log( 'Data added');
			}); 
		} catch(err) {	
			console.log(err);
			return res.send('Error saving');
		}
	});	
}

const newUser = new Usuario({
	nombre: process.env.TEST_NAME, 
	email: process.env.TEST_EMAIL, 
	password: process.env.TEST_PASSWD
});
const JSONFile = __dirname + '/' + process.env.ADDS_SAMPLES;

const users = cleanAndPopulate(Usuario, newUser);
const adds = cleanAndPopulateJSON(Anuncio, JSONFile);
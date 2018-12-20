'use strict';

const express = require('express');
const mongoose = require ('./connectMongoose.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config()

const saltRounds = 10;
const Anuncio = require ('./../models/Anuncio.js');
const Usuario = require ('./../models/Usuario.js');


/**
 * Initializes MongoDB database using Mongoose.
 * Cleans any previous data on modeled collections.
 * Adds sample data of ads and a test user in their collections.
 */

// We use async-await promises to make sure the collection is cleaned before adding any sample data

Anuncio.deleteMany({}, async function(err) { 
  if(err) throw err;
  console.log('Ads collection cleaned') 
  
  // Now we can read the file and save the ads data on DB
  await fs.readFile( __dirname + '/anuncios.json', 'utf8', async function (err, data) {
    if (err) throw err;
    const jsonFile = await JSON.parse(data);
    const jsonArray = jsonFile["anuncios"];
    
    let sampleAd;
  
    // Loop through the JSON array saving it as documents 
    for(let i = 0; i < jsonArray.length; i++){
        sampleAd = new Anuncio(jsonArray[i]);
        sampleAd.save(function (err, AdCreated) {
        if (err) throw err;
        console.log('Ad ' + AdCreated.nombre + ' created');
      });
    }
  });
}); 


// We do the same with users collection, and create the test user defined in .env
Usuario.deleteMany({}, async function(err) {
  if (err) throw err 
  console.log('Users collection cleaned')    
    
  try{
    // We hash the password, otherwise login process will fail
    await bcrypt.hash(process.env.TEST_PASSWD, saltRounds, function(err, hash) {
        if(err) throw err;
        
        const newUser = new Usuario({nombre: process.env.TEST_NAME, email: process.env.TEST_EMAIL, passwd: hash});
        newUser.save(function (err, UserCreated) {
          if (err) throw err;
          console.log('User ' + UserCreated.nombre + ' created');
        });
    });

  } catch (err){
    next(err);
    return;
  }  
});
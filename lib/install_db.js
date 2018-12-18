'use strict';

/**
 * Initializes MongoDB database using Mongoose.
 * Cleans any previous data on modeled collections.
 * Adds sample data to ads and user collections.
 */

const express = require('express');
const mongoose = require ('./connectMongoose.js');
var fs = require('fs');

const Ad = require ('./../models/Ad.js');


// Cleaning collections - remove any previous data
Ad.remove({}, function(err) { 
  console.log('collection removed') 
}); 
// TODO DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
// TODO no va bien si actualizas anuncios.json... parace que se mezcla con el asincrono... 
// TODO Cargar el JSON debería de esperar a que se limpiara la coleccíon.

// Reads 'anuncios.json' file, parse JSON. We do it in asynchronous mode to avoid blocking eventloop using a promise async - await.
fs.readFile( __dirname + '/anuncios.json', 'utf8', async function (err, data) {
  if (err) throw err;
  const jsonFile = await JSON.parse(data);
  const jsonArray = jsonFile["anuncios"];
  
  let sampleAd;

  // Loop through the JSON array saving as documents 
  for(let i = 0; i < jsonArray.length; i++){
      sampleAd = new Ad(jsonArray[i]);
      sampleAd.save(function (err, AdCreado) {
      if (err) throw err;
      console.log('Ad ' + AdCreado.name + ' creado');
    });
  }
  
  
});

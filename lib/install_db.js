'use strict';

const express = require('express');
const mongoose = require ('./connectMongoose.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Initializes MongoDB database using Mongoose.
 * Cleans any previous data on modeled collections.
 * Adds sample data of ads and users in their collections.
 */

const Ad = require ('./../models/Ad.js');
const User = require ('./../models/User.js');


// We use async-await promises to make sure the collection is cleaned before adding any sample data
Ad.deleteMany({}, async function(err) { 
  console.log('Ads collection cleaned') 
  
  // Now we can read the file and save the ads data on DB
  await fs.readFile( __dirname + '/anuncios.json', 'utf8', async function (err, data) {
    if (err) throw err;
    const jsonFile = await JSON.parse(data);
    const jsonArray = jsonFile["anuncios"];
    
    let sampleAd;
  
    // Loop through the JSON array saving as documents 
    for(let i = 0; i < jsonArray.length; i++){
        sampleAd = new Ad(jsonArray[i]);
        sampleAd.save(function (err, AdCreated) {
        if (err) throw err;
        console.log('Ad ' + AdCreated.name + ' created');
      });
    }
    
    
  });

}); 

const testUser = {
  name: 'Admin  ',
  email: 'admin@example.com',
  passwd: '1234'
};


// We do the same with users collection, and create the test user.
User.deleteMany({}, async function(err) {
  if (err) throw err 
  console.log('Users collection cleaned')  
    
  try{
    // We hash the password, otherwise login process will fail
    await bcrypt.hash(testUser.passwd, saltRounds, async function(err, hash) {

        const newUser = new User({name: testUser.name, email: testUser.email, passwd: hash});
        await newUser.save(function (err, UserCreated) {
          if (err) throw err;
          console.log('User ' + UserCreated.name + ' created');
        });
    });

  } catch (err){
    next(err);
    return;
  }  
});

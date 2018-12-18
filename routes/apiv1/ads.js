'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');


/**
 * GET /adds
 * Get a list of adds
 */
 router.get('/', (req, res, next) => {
    Ad.find().exec((err, list) => {
        if(err) {
            next(err);
            return;
        }

        
        res.json({ success: true, results: list});
    });    
 });

 module.exports = router;


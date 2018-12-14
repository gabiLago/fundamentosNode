'use strict';

const express = require('express');
const router = express.Router();

const Add = require('../../models/Add');

/**
 * GET /adds
 * Get a list of adds
 */
 router.get('/', (req, res, next) => {
    Add.find().exec((err, list) => {
        if(err) {
            next(err);
            return;
        }

        res.json({ success: true, results: list});
    });    
 });

 module.exports = router;
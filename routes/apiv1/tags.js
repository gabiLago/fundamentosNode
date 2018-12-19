'use strict';

const express = require('express');
const router = express.Router();

const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');
router.use( jwtAuthMiddleware());

const Ad = require('../../models/Ad');

/**
 * GET /tags
 * List of the distinct tags on DB
 */
router.get('/', async (req, res, next) => {
    
    Ad.find().distinct('tags', function(err, ids) {
        if (err) throw err;
        res.json({ success: true, result: ids});
    });
});

module.exports = router;
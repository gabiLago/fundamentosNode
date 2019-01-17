'use strict';

const express = require('express');
const router = express.Router();
const i18n = require("i18n");

const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');
router.use( jwtAuthMiddleware());

const Ad = require('../../models/Anuncio');

/**
 * GET /tags
 * List of the distinct tags on DB
 */


router.get('/', async (req, res, next) => {
    try{
        Ad.find().distinct('tags', function(err, ids) {
            if (err) throw err;
            res.json({ success: true, result: ids});
        });
    } catch(err){
        console.log(err);
	    res.json({ success: false, result: res.__('Internal error')});        
        return;
    }    
});

module.exports = router;
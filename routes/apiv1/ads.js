'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');
const basicAuthMiddleware = require('../../lib/basicAuthMiddleware');

router.use( basicAuthMiddleware(process.env.BASIC_AUTH_NAME, process.env.BASIC_AUTH_PASS) );

/**
 * GET /ads
 * Filtered by tags, sales, price range, and name first letters
 */
router.get('/', async (req, res, next) => {
    
    // Entry Data
    const tag = req.query.tag;
    const sale = req.query.venta;
    const price = req.query.precio;
    const name = req.query.nombre;
    const sort = req.query.sort;
    const limit = parseInt(req.query.limit);
    const start = parseInt(req.query.start);
    
    // Query filters
    const filter = {};

    if (tag) filter.tags = tag;
    if (sale) filter.sale = sale;
    if (price) {
        // Price range comes in the http request in a string with one or two values separated by a dash.
        // We use 'split' to store them in an array getting rid of the dash.
        var range = price.split("-");

        if ( range[0] && range[1] ){
            // If there ara values at both sides of the dash -> $gte & $lte
            filter.price = {"$lte" : range[1], "$gte" : range[0]};

        } else if ( range[0] ) {
            // If there´s only a value at the left of the dash -> only $gte
            filter.price = {"$gte" : range[0]};

        } else {
            // If there´s a value only at the right of the dash -> only $lte
            filter.price = {"$lte" : range[1]};
        }
    } 
    
    if (name){
        // Regex to search by name starting with req
        filter.name = new RegExp('^' + name, "i")
    }

    const query = Ad.find( filter );

    // Query modifiers
    if (limit) query.limit(limit);
    if (start) query.start(start); 
    if (sort) query.sort(sort); 
    // TODO comprobar que funcionan todos
        

    try{
        // Exec the query aplying the filters founded
        const ad = await query.exec();

        res.json({ success: true, result: ad});
    } catch(err) {
        next(err);
        return;
    }    
});

 module.exports = router;

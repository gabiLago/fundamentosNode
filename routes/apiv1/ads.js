'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');


// Filters
/**
 * GET /agentes/:id
 * Obtener un agente buscando por id usando una promesa
 * Metido en un try catch para poder recoger posibles errores
 *
 */ 




/**
 * Filtered by tags, sales
 */
router.get('/', async (req, res, next) => {
    
    // Get the filters on http req parameters
    const tag = req.query.tag;
    const sale = req.query.venta;
    const price = req.query.precio;
    const name = req.query.nombre;
    
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

    try{
        // Exec the query aplying the filters founded
        const ad = await query.exec();

        res.json({ success: true, result: ad});
    } catch(err) {
        next(err);
        return;
    }    
});




/**
 * Filtered by price range (min and max)
 */

/**
 * Filtered by article name as parameter (using regexp)
 */



/**
 * GET /adds
 * Get an unfiltered list of adds
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

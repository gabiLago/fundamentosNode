'use strict';

const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const Ad = require('../../models/Anuncio');
const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');

router.use(jwtAuthMiddleware());

/**
 * GET /ads
 * Filtered by tags, sales, price range, and name first letters
 */
router.get('/', async (req, res, next) => {
	i18n.init(req, res); // Initializes translation

	// Entry Data
	const tag = req.query.tag;
	const venta = req.query.venta;
	const precio = req.query.precio;
	const nombre = req.query.nombre;
	const sort = req.query.sort;
	const limit = parseInt(req.query.limit);
	const start = parseInt(req.query.start);
    
	// Query filters
	const filter = {};

	if (tag) filter.tags = tag;
	if (venta) filter.venta = venta;
	if (precio) {
		// If price param hash a dash
		if (precio.includes('-')){            
			// Price range comes in the entry data as a string with one or two values separated by a dash.
			// We use 'split' to store them in an array getting rid of the dash.
			var range = precio.split('-');

			if ( range[0] && range[1] ){
				// If there ara values at both sides of the dash -> $gte & $lte
				filter.precio = {"$lte" : range[1], "$gte" : range[0]};

			} else if ( range[0] ) {
				// If there´s only a value at the left of the dash -> only $gte
				filter.precio = {"$gte" : range[0]};

			} else {
				// There´s a value only at the right of the dash -> only $lte
				filter.precio = {"$lte" : range[1]};
			}
		} else {
			// If there isn´t any dash, then we asure it is a number or throws an error that will be catched.
			if (!isNaN ( parseInt(precio) )) {
				filter.precio = precio;
			} 
		} 
	}

	if (nombre){
		// Regex to search by name starting with:
		filter.nombre = new RegExp('^' + nombre, "i")
	}

	const query = Ad.find( filter );

	// Query modifiers
	if (limit) query.limit(limit);
	if (start) query.start(start); 
	if (sort) query.sort(sort);         

	try{
		// Exec the query aplying the filters founded
		const ad = await query.exec();
		res.json({ success: true, result: ad});
	} catch(err) {
		// We catch the errors to prevent a bad query param stops the app.
		res.json({ success: false, result: res.__('Incorrect format for parameter ' + err.path )});        
		return;
	}    
});

module.exports = router;

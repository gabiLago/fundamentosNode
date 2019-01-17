'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


// Connection to DB and Models Definitions
require('./lib/connectMongoose');
require('./models/Anuncio');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API Routes
 */
app.use('/api/anuncios', require('./routes/api/anuncios.js')); // Ads lists
app.use('/api/usuarios/login', require('./routes/api/usuariosAuthentication.js')); // Users signin
app.use('/api/usuarios/registro', require('./routes/api/usuariosRegistro.js')); // Users signup
app.use('/api/anuncios/tags', require('./routes/api/tags.js')); // Tags List

/**
 * web Routes
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

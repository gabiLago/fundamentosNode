'use strict';
const jwt = require('jsonwebtoken');
const i18n = require('i18n');

// Middleware for authentication JWT
module.exports = () => {
	return (req, res, next) => {
		i18n.init(req, res);

		// get the token
		const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

		if (!token) {
			const err = new Error(res.__('No token provided'));
			err.status = 401;
			next(err);
			return;
		}

		// Token verification
		jwt.verify(token, process.env.JWT_SECRET, (err, decodifiedToken) =>{
			if (err){
				res.status(401).json({ success: false, error: res.__('Invalid Token') });
				return;
			}
			req.user_id = decodifiedToken.user_id;
			next();
		});
	};
};
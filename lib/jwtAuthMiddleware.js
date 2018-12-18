'use strict';

const jwt = require('jsonwebtoken');

// Middleware for authentication JWT
module.exports = () => {
    return (req, res, next) => {
        // get the token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // Token verification
        jwt.verify(token, process.env.JWT_SECRET, (err, decodifiedToken) =>{
            if (err){
                next (new Error('Invalid Token'));
                return
            }
            req.user_id = decodifiedToken.user_id;
            next();
        });
    };
};
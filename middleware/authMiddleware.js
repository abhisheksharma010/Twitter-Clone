const JWT = require('jsonwebtoken');
const userModel =require('../models/userModel');


const requiredSignIn = (req, res, next) => {
    // Extract token from the request, e.g., from headers or cookies
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    try {
        const decode = JWT.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
        );
        req.user = decode;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        console.log(error);
      }
    };



 module.exports ={requiredSignIn};
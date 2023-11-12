const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requiredSignIn =  async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };


 module.exports ={requiredSignIn};
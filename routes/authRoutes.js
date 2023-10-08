const express = require('express');
const router = express.Router();
const {signUpController} = require('../controllers/authController');

router.post('/signup',signUpController);

module.exports = router;
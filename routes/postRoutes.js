const express = require('express');
const app = express();
const {getEveryPost} = require('../controllers/postController')

const islogin = require('../controllers/authController');

app.get('/for-you',getEveryPost);

const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');


const requiredSignIn = require('../middleware/authMiddleware');
const {getEveryPost,PostController} = require('../controllers/postController')

const islogin = require('../controllers/authController');

router.get('/for-you',getEveryPost);
router.post('/create-post',formidable(), PostController);
module.exports = router;
const express = require('express');
const router = express.Router();
const {getChatUser,createGroupController,addGroupController,removeUserFromGroupController} = require('../controllers/chatController');
router.get('/',getChatUser);
router.post('/create-group',createGroupController);
router.post('/add-group',addGroupController);
router.post('/remove-group',removeUserFromGroupController);
module.exports = router;
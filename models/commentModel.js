// commentModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'users',
        required: true,
    },
    post: {
        type: mongoose.ObjectId,
        ref: 'posts',
        required: true,
    },
});

module.exports = mongoose.model('comments', commentSchema);

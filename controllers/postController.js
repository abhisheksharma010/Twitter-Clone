const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const fs = require('fs');

const getEveryPost = async (req, res) => {
  try {
    const posts = await postModel.find({});

    res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting posts",
      error: error.message,
    });
  }
};

const PostController = async (req, res) => {
  try {
    const { title, type, userid } = req.fields;
    const { photo } = req.files;

    if (!userid || !type || !title) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Check if the user exists
    const user = await userModel.findById(userid);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please log in.' });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).json({ success: false, error: 'Photo is required and should be less than 1MB.' });
    }

    const post = new postModel({
      userid,
      title,
      type,
    });

    if (photo) {
      post.image.push({
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      });
    }

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Post Created Successfully',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// module.exports = PostController;

 module.exports = {getEveryPost,PostController};
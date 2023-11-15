const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');



const followController = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        // Find user1 and user2 in the database
        const u1 = await userModel.findOne({ _id: user1 });
        const u2 = await userModel.findOne({ _id: user2 });

        if (!u1 || !u2) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user1 is already following user2
        const isFollowing = u1.followers.includes(user2);

        if (isFollowing) {
            // If following, unfollow
            u1.followers = u1.followers.filter((follower) => follower.toString() !== user2.toString());
            u2.following = u2.following.filter((following) => following.toString() !== user1.toString());
        } else {
            // If not following, follow
            u1.followers.push(user2);
            u2.following.push(user1);
        }

        // Save the changes to the database
        await u1.save();
        await u2.save();

        return res.status(200).json({ message: isFollowing ? 'Successfully unfollowed' : 'Successfully followed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { followController };

const likeController = async (req, res) => {
    const { user, post } = req.body;

    try {
        const user1 = await userModel.findOne({ _id: user });
        const post1 = await postModel.findOne({ _id: post });

        if (!user1 || !post1) {
            return res.status(404).send({
                success: false,
                message: "Error in getting the post and user",
                error: error.message,
            });
        }

        // Check if the user has already liked the post
        const isLiked = user1.likes.includes(post1._id);

        if (isLiked) {
            // If liked, remove the like
            user1.likes = user1.likes.filter((like) => like.toString() !== post1._id.toString());
            post1.likes = post1.likes.filter((like) => like.toString() !== user1._id.toString());
        } else {
            // If not liked, add the like
            user1.likes.push(post1);
            post1.likes.push(user1);
        }

        // Save changes to the database
        await user1.save();
        await post1.save();

        return res.status(200).send({
            success: true,
            message: isLiked ? 'Post Unliked Successfully' : 'Post Liked Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in liking/unliking the post',
            error,
        });
    }
};



const commentController = async (req, res) => {
    const { user, post, text } = req.body;

    try {
        // Check if required fields are present in the request body
        if (!user || !post || !text) {
            return res.status(400).json({ message: 'Missing user, post, or text in the request body' });
        }

        // Find the user and post in the database
        const currentUser = await userModel.findOne({ _id: user });
        const currentPost = await postModel.findOne({ _id: post });

        if (!currentUser || !currentPost) {
            return res.status(404).json({ message: 'User or post not found' });
        }

        // Create a new comment using the commentModel
        const newComment = new commentModel({
            text,
            user: currentUser._id,
            post: currentPost._id,
        });
        console.log(newComment._id);

        await newComment.save();

        currentPost.comments.push(newComment._id);
        currentUser.comments.push(newComment._id);

        await currentPost.save();
        await currentUser.save();

        return res.status(200).json({ message: 'Comment added successfully', newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteCommentController = async (req, res) => {
    const { user, post, comment } = req.body;

    try {
        // Check if required fields are present in the request body
        if (!user || !post || !comment) {
            return res.status(400).json({ message: 'Missing user, post, or comment in the request body' });
        }

        // Find the user, post, and comment in the database
        const currentUser = await userModel.findOne({ _id: user });
        const currentPost = await postModel.findOne({ _id: post });
        const currentComment = await commentModel.findOne({ _id: comment });

        if (!currentUser || !currentPost || !currentComment) {
            return res.status(404).json({ message: 'User, post, or comment not found' });
        }

        // Find the index of the comment in the post's comments array
        const commentIndex = currentPost.comments.findIndex((c) => c.toString() === comment);

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found in the post' });
        }

        // Remove the comment from the post and user
        currentPost.comments.splice(commentIndex, 1);
        currentUser.comments = currentUser.comments.filter((c) => c.toString() !== comment);

        // Delete the comment from the commentModel
        await commentModel.deleteOne({ _id: comment });

        // Save the changes to the database
        await currentPost.save();
        await currentUser.save();

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const searchUserController = async (req, res) => {
    const { username } = req.body;

    try {
        // Check if username is provided
        if (!username) {
            return res.status(400).json({ message: 'Missing username in the query parameters' });
        }

        const regex = new RegExp(`^.*${username.split('').join('.*')}.*$`, 'i');

        const foundUsers = await userModel.find({ name: { $regex: regex } });

        return res.status(200).json({ message: 'Users found successfully', users: foundUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const followerListController = async (req, res) => {
    const { user } = req.body;

    try {
        // Check if user ID is provided
        if (!user) {
            return res.status(400).json({ success: false, message: 'Missing user ID in the request body' });
        }

        // Find the user in the database
        const userlist = await userModel.findById(user);

        // Check if user exists
        if (!userlist) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Return the list of followers
        return res.status(200).json({ success: true, message: 'List of followers', followers: userlist.followers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const followingListController = async (req, res) => {
    const { user } = req.body;

    try {
        if (!user) {
            return res.status(400).json({ success: false, message: 'Missing user ID in the request body' });
        }
        const userlist = await userModel.findById(user);

        if (!userlist) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'List of following users', following: userlist.following });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const checkFollowStatusController = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        if (!user1 || !user2) {
            return res.status(400).json({ success: false, message: 'Missing user IDs in the request body' });
        }

        const u1 = await userModel.findById(user1);

        if (!u1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const user1FollowsUser2 = u1.following.includes(user2);

        return res.status(200).json({
            success: true,
            message: 'Follow status checked successfully',
            followStatus: user1FollowsUser2,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};






module.exports = { followController,likeController,commentController,deleteCommentController,searchUserController,followingListController,followerListController , checkFollowStatusController};

const messageModel = require('../models/messageModel');
const chatModel = require('../models/chatModel');
const { models } = require('mongoose');

const sendMessageController = async (req, res) => {
    const { message, chatId, senderId,recieverId } = req.body;

    try {
        // Check if the chatId exists
        let chat = await chatModel.findById(chatId);

        // If chatId does not exist, create a new chat
        if (!chat) {
            const newChat = new chatModel({
                // You can set other properties for the new chat as needed
            });
            chat = await newChat.save();
        }

        // Create a new message
        const newMessage = new messageModel({
            message,
            sender: userId,
            chatId: chat._id, // Use the chatId obtained or created above
        });

        await newMessage.save();

        // Update the latestMessage in the chat
        await chatModel.findByIdAndUpdate(chat._id, { latestMessage: newMessage._id });

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
module.exports = {sendMessageController};
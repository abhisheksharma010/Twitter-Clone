const chatModel = require('../models/chatSchema');
const getChatUser = async(req,res)=>{
    const {userid} = req.body;
    if(!userid){
        return res.status(404).send({success:false,message:"User is not found"});
    }
    const chats = await chatModel.find({users:{$in:[userid]}});
    
    res.status(200).send({success:true,message:"Chats found Successfully",chats});

}
const createGroupController = async(req,res) =>{
    try {
        // Extract relevant information from the request body
        const { photo, chatName, users, groupAdmin } = req.body;
    
        // Create a new chat instance using the Chat model
        const newGroup = new chatModel({
          photo: photo || 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
          chatName,
          isGroup: true, // Assuming this is a group chat
          users,
          groupAdmin,
        });
    
        // Save the new group chat to the database
        const createdGroup = await newGroup.save();
    
        // Respond with the created group chat
        res.status(201).json(createdGroup);
      } catch (error) {
        // Handle errors
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    const addGroupController = async (req, res) => {
      try {
        const { userid, adminid, chatid } = req.body;
    
        // Check if the required fields are present in the request body
        if (!userid || !adminid || !chatid) {
          return res.status(400).json({ success: false, message: "Invalid request, missing parameters" });
        }
    
        const chat = await chatModel.findById(chatid);
    
        if (!chat) {
          return res.status(404).json({ success: false, message: "Chat not found" });
        }
    
        if (chat.groupAdmin.toString() !== adminid) {
          return res.status(403).json({ success: false, message: "You are not the admin of this group" });
        }
    
    
        chat.users.push(userid);
        await chat.save();
    
        return res.status(200).json({ success: true, message: "User added to the group successfully" });
    
      } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
    const removeUserFromGroupController = async (req, res) => {
      try {
        const { userid, adminid, chatid } = req.body;
    
        // Check if the required fields are present in the request body
        if (!userid || !adminid || !chatid) {
          return res.status(400).json({ success: false, message: "Invalid request, missing parameters" });
        }
    
        const chat = await chatModel.findById(chatid);
    
        if (!chat) {
          return res.status(404).json({ success: false, message: "Chat not found" });
        }
        if (chat.groupAdmin.toString() !== adminid) {
          return res.status(403).json({ success: false, message: "You are not the admin of this group" });
        }
    
        if (!chat.users.includes(userid)) {
          return res.status(404).json({ success: false, message: "User not found in the group" });
        }
    
        chat.users = chat.users.filter(userId => userId.toString() !== userid);
        await chat.save();
    
        return res.status(200).json({ success: true, message: "User removed from the group successfully" });
    
      } catch (error) {
        console.error('Error removing user from group:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };
    




    
module.exports = {getChatUser,createGroupController,addGroupController,removeUserFromGroupController};
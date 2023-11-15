const mongoose = require('mongoose');
 const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ser",
      },
      message: {
        type: String,
        trim: true,
      },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
      },
    },
    {
      timestamps: true,
    
 })
 
module.exports = mongoose.model('message',messageSchema);
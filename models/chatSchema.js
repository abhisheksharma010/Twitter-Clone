const mongoose = require('mongoose');
 const chatSchema =  new mongoose.Schema({
    photo: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
      },
      chatName: {
        type: String,
      },
      isGroup: {
        type: Boolean,
        default: false,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
      },
      groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
 )
 module.exports = mongoose.model('chat',chatSchema);
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        require:true,
        trim:true,
    },
    email:{
        type:'String',
        require:true,
        unique:true,
    },
    password:{
        type:'String',
        require:true,
    },
    followers: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
      },
  ],
  following: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
      },
  ],
  likes: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'posts',
          required: true,
      },
  ],
  comments: [
    {
        type: mongoose.ObjectId,
        ref: 'comments',
        required: true,
    },
],
    location: String,
    bio:String,
    profilephoto: {
        data: Buffer,
        contentType: String,
      },
      backgorundphoto: {
        data: Buffer,
        contentType: String,
      },
      dateOfBirth: Date, // Add date of birth field
      joinedDate: {
          type: Date,
          default: Date.now, // Set the default value to the current date and time
      },
      role:{
        type:Number,
        default:0
    },
},{timestamps:true}
)

module.exports = mongoose.model('users',userSchema);
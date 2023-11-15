const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
    {
    title:{
        type:'String',
    },
    image:[
        {
            data: Buffer,
            contentType: String,
          },
    ],
    likes:[
        {
            type: mongoose.ObjectId,
                ref: "users",
                required: true,
            }
    ],
    comments: [
        {
            type: mongoose.ObjectId,
            ref: 'comments',
            required: true,
        },
    ],
    type:{
        type:String,
        // default:0
    },
    userid:{
        type:'String',
    },
    postedDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
},{timestamps:true}
);
module.exports = mongoose.model('posts',postSchema);
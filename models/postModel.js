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
    comments:[
        {
            text: {
                type: String,
                required: true,
            },
            post: {
                type: mongoose.ObjectId,
                ref: 'users',
                required: true,
            },
        },
    ],
    type:{
        type:String,
        // default:0
    },
    userid:{
        type:'String',
    }
}
);
module.exports = mongoose.model('posts',postSchema);
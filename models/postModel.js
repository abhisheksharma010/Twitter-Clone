const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
    {
    text:{
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
    ]
}
);
module.exports = mongoose.model('posts',postSchema);
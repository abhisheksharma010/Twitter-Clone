const postModel = require('../models/postModel');

const getEveryPost = async (req,res) =>{
    try {
        const post = await postModel.find({}).sort()
    } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in gettting post",
        error:error.message,
    })
    }
}
 module.exports = {getEveryPost};
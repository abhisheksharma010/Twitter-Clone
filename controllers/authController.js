const userModel = require('../models/userModel');
const {hashedpassword,comparePassword} = require('../helper/authHelper.')
const signUpController = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
      
        if(!name || !email){
           return res.status(400).send({
                success:false,
                message:'Fill  the all details',
     
                })
        }
        if (password.length < 6) {
          return  res.status(400).send({
                success: false,
                message: 'Password must be at least 6 characters long',
            });
        }
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:false,
                message:"Already existed uuser"
            });
        
        }

        const hashpassword = await hashedpassword(password);
        const user = new userModel({name:name,email:email,password:hashpassword}).save();
        return res.status(201).send({
            success:true,
            message:'Signing is successful',
            user,
        })
    } catch (error) {
      return  res.status(500).send({
        success:false,
        message:'There is error in sign up'+error.message,
        error
        })
    }
}

module.exports = {signUpController};
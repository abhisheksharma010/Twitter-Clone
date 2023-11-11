const userModel = require('../models/userModel');
const {hashedpassword,comparePassword} = require('../helper/authHelper.');
var nodemailer = require('nodemailer');

const JWT = require('jsonwebtoken');

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
const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email){
            return res.send({error:"Email is required"});
        }
        const user = await userModel.findOne({email});
        if(!user){
           return res.status(404).send({
                success:false,
                message:' User is not registered',
         
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Password is incorrect'
            }
            )
        }

        const token = await JWT.sign({_id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
  }
  const forgotPasswordController = async(req,res)=>{
    const {email} = req.body;
    try {
        const oldUser = await userModel.findOne({email});
        if(!oldUser){
            return res.send('User does not exist');
        }
        const  secret = process.env.JWT_SECRET +oldUser.password;
        const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
          });
          const link = `http://localhost:3000/reset-password/${encodeURIComponent(oldUser._id)}/${encodeURIComponent(token)}`;

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abhishek.sharma55400@gmail.com',
              pass: 'lhfl gnji nqbr qtaa'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: oldUser.email,
            subject: 'Reset Password',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
          return res.status(201).send({
            success:true,
            message:'Mailed is send',
           
        })
        
    } catch (error) {
        console.log(error);
        
    }

  }
//  const resetPasswordPost = async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params+"yo yo");
//   const oldUser = await userModel.findOne({  id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = process.env.JWT_SECRET + oldUser.password;
//   try {
//     const verify = JWT.verify(token, secret);
    
//       if (verify.exp < Date.now() / 1000) {
//         return res.status(400).json({
//           success: false,
//           message: "Token has expired. Please request a new password reset link.",
//         });
//       }
//     res.render("Verified");
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified"+oldUser.id);
//   }
// };
  const resetPasswordPost = async (req, res) => {
    const { id, token, password } = req.body;
    
    const oldUser = await userModel.findOne({_id:id});
    console.log("called");
    console.log(password);
    console.log(id);
    console.log(token);
    console.log(oldUser);
  
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
  
    const secret = process.env.JWT_SECRET + oldUser.password;
  
    try {
      const decode = JWT.verify(token, secret);
  
      if (decode.exp < Date.now() / 1000) {
        return res.status(400).json({
          success: false,
          message: "Token has expired. Please request a new password reset link.",
        });
      }
  
      const hashpassword = await hashedpassword(password);
      await userModel.findByIdAndUpdate(oldUser._id, { password: hashpassword });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      // Check if the error is due to token expiration
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Token has expired. Please request a new password reset link.",
        });
      }
  
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  // const resetPasswordGet = async(req,res) =>{
  //   const { id, token } = req.params;
  //   console.log(req.params);

  //   const oldUser = await User.findOne({ _id: id });
  //   if (!oldUser) {
  //     return res.json({ status: "User Not Exists!!" });
  //   }
  //   const secret = JWT_SECRET + oldUser.password;
  //   try {
  //     const verify = JWT.verify(token, secret);
  //     if (verify.exp < Date.now() / 1000) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Token has expired. Please request a new password reset link.",
  //       });
  //     }
  //     const hashed = await hashedpassword(password);

  //     await userModel.findByIdAndUpdate(user._id, { password: hashed });

  //     return res.status(201).send({
  //       success:true,
  //       message:'Link is correct',
  //       id,
  //       token,
  //   })
  //   } catch (error) {
  //     console.log(error);
  //     res.send("Not Verified");
  //   }
  // };


  
module.exports = {forgotPasswordController,signUpController,loginController,resetPasswordPost};
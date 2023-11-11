const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const app = express();


const JWT = require('jsonwebtoken');
const cors = require('cors');
dotenv.config();
var nodemailer = require('nodemailer');

app.use(cors());

const authRoutes = require('./routes/authRoutes');
const userModel = require('./models/userModel');


Port = process.env.PORT||8000;
app.use(express.json());

app.use('/api/auth',authRoutes);
app.get('/',(req,res)=>{
    res.send(`Hello`);
})
app.listen(Port,(res,req)=>{
    
    console.log(`listening on ${Port}`)
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// app.get("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     console.log(req.params);
//     const oldUser = await userModel.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = process.env.JWT_SECRET + oldUser.password;
//     try {
//       const verify = JWT.verify(token, secret);
//       res.render("index", { email: verify.email, status: "No Verified" });
//     } catch (error) {
//       console.log(error);
//       res.send("Not Verified");
//     }
//   });
connectDb();
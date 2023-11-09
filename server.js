const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const app = express();
dotenv.config();

const authRoutes = require('./routes/authRoutes');


Port = process.env.PORT||8000;
app.use(express.json());

app.use('/api/auth',authRoutes);
app.get('/',(req,res)=>{
    res.send(`Hello`);
})
app.listen(Port,(res,req)=>{
    
    console.log(`listening on ${Port}`)
})
connectDb();
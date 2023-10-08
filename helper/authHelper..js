const bcrypt = require('bcrypt');
 const hashedpassword = async(password)=>{
    try {
        const salt =10;
        const hashpassword = await bcrypt.hash(password,salt);
        return hashpassword;
    } catch (error) {
        console.log(error);
    }
 }
 const comparePassword = async(hashedpassword,password)=>{
    try {
        return bcrypt.compare(hashedpassword,password);
    } catch (error) {
        console.log(error);
    }
 }
 module.exports ={hashedpassword,comparePassword};
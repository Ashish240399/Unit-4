require('dotenv').config()
const User=require('../models/user.model');
var jwt = require('jsonwebtoken');
const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY);
}
const register=async(req,res)=>{
    try {
        let user= await User.findOne({email:req.body.email});
        if(user){
            return res.send("Email alredy exists");
        }
        user=await User.create(req.body);
        const token=newToken(user);
        return res.send({user,token});
    } catch (error) {
        return res.send(error);
    }
};
const login=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.send("Invalid email or password")
        }
        const match=user.checkPassword(req.body.password);
        if(!match){
            return res.send("Invalid password")
        }
        const token=newToken(user);
        return res.send({user,token});
    } catch (error) {
        return res.send(error);
    }
}
module.exports={register,login,newToken};
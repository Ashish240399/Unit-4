const express=require("express");
const router=express.Router();
const User=require("../models/user.model");
const { body, validationResult } = require('express-validator');
router.post("",body("firstName").not().isEmpty().isLength({min:3,max:30}),
body("lastName").not().isEmpty().isLength({min:3,max:30}),
body("age").isNumeric().custom((value)=>{
    if(value<1 && value>150){
        throw new Error ("Invalid age")
    }
    return true;
}),
body("email").custom(async(value)=>{
    const user=await User.findOne({email:value});
    if(user){
        throw new Error("Email already exists")
    }
    return true;
}),
async(req,res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.send(errors)
        }
        const user=await User.create(req.body);
        return res.send(user);
    } catch (error) {
        return res.send(error)
    }
});

module.exports=router;
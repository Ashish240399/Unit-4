const express=require("express");
const router=express.Router();
const Comment=require("../models/comment.model");
router.post("",async(req,res)=>{
    try {
        const comment=await Comment.create(req.body);
        return res.send(comment);
    } catch (error) {
        console.log(error);
    }
});
module.exports=router;
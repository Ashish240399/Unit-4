const express=require("express");
const router=express.Router();
const Book=require("../models/book.model");
const { body, validationResult } = require('express-validator');
const upload=require("../middlewares/book");
router.post("",upload.single("coverImage"),async(req,res)=>{
    try {
        const book=await Book.create({
            likes:req.body.likes,
            coverImage:req.file.path,
            userId:req.body.userId,
            publicationId:req.body.publicationId,
            conent:req.body.content
        }) 
        return res.send(book);
    } catch (error) {
        console.log(error)
    }
})
module.exports=router;
const express=require("express");
const router=express.Router();
const authenticate=require("../middlewares/auth");
const authorise=require("../middlewares/authorise");
const Product=require("../models/product.model")
router.post("", authenticate, async (req, res) => {

    req.body.userId = req.user._id;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
});
router.patch("/:id", authenticate, authorise(["admin","seller"]), async(req, res) => {
    try{
        let user=await Product.findById(req.params.id).populate("userId").lean().exec();
        console.log(user.userId.email);
        userEmail=user.userId.email;
        req.body.userId = req.user._id;
        req.body.email=req.user.email;
        console.log(req.body.email);
        if(userEmail!==req.body.email){
            return res.send("You are not Authorized");
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})
router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})
router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate({path:"userId"}).lean().exec();
        console.log(product.userId.email)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})
module.exports=router;
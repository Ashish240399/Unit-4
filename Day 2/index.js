const express=require("express");
const app=express();
app.get("/",function(req,res){
    res.send("hello");
})
app.get("/books",function(req,res){
    res.send({
        Gandhi:"Truth of his life",
        WingsOfFire:"Life of APJ Abdul Kalam",
        MsDhoni:"Untold Story",
        Modi:"How his life turns to politics"
    })
})
app.listen(4002,()=>{
    console.log("My server");
})
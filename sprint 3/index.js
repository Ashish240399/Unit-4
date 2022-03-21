const express=require("express");
const connectDb=require("./config/db");
const userController=require("./controller/userController");
const bookController=require("./controller/bookContoller");
const commentController=require("./controller/commentsController");
const app=express();
app.use(express.json());
app.use("/users",userController);
app.use("/books",bookController);
app.use("/comments",commentController);
app.listen(5000,async()=>{
    try {
        await connectDb();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to 5000")
})
const app=require("./index");
const connectDB=require("./config/db");
app.listen(5000,async()=>{
    try {
        await connectDB();
    } catch (error) {
        return error
    }
    console.log("Listening 5000")
});
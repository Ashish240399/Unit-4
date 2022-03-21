const mongoose=require("mongoose");
const commentSchema=mongoose.Schema({
    body:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book",required:true},
},{
    timestamps:true,
})
module.exports=mongoose.model("comment",commentSchema)
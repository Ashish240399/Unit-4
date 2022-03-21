const mongoose=require("mongoose");
const bookSchema=mongoose.Schema({
    likes:{type:String,require:true,default:0},
    coverImage:{type:String,require:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    publicationId:{type:mongoose.Schema.Types.ObjectId,ref:"publication",required:true},
    content:{type:String,require:true},
},{
    timestamps:true
})
module.exports=mongoose.model("book",bookSchema);

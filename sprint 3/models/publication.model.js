const mongoose=require("mongoose");
const publicationSchema=mongoose.Schema({
    name:{type:String,required:true},
},{
    timestamps:true,
})
module.exports=mongoose.model("publication",publicationSchema);
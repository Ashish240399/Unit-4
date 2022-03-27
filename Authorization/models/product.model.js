const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    
},
{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("product",productSchema);
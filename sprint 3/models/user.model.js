const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String},
    age:{type:Number,require:true},
    email:{type:String,require:true,unique:true},
    profileImage:{type:String,require:true},

},{
    timestamps:true,
})
module.exports=mongoose.model("user",userSchema)
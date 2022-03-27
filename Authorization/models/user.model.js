const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:[{type:String}]
},{
    versionKey:false,
    timestamps:true
});
userSchema.pre("save",function(next){
    const hash = bcrypt.hashSync(this.password, 7);
    this.password=hash;
    next();
});
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}
module.exports=mongoose.model("user",userSchema);
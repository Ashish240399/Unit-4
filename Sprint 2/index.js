const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json())
const connect=()=>{
    return mongoose.connect("mongodb+srv://Ashish7797:Ashish7797@cluster0.3get3.mongodb.net/eval?retryWrites=true&w=majority")
}
const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        age:{type:Number,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true},

    },{
        timestamps:true
    }
);
const User=mongoose.model("user",userSchema);
const branchSchema=new mongoose.Schema(
    {
        name :{type:String,required:true},
        address:{type:String,required:true},
        IFSC :{type:String,required:true},
        MICR :{type:Number,required:true},
    },
    {
        timestamps:true
    }
);
const Branch=mongoose.model("branch",branchSchema);
const masterSchema=new mongoose.Schema(
    {
        balance:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        branchId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"branch",
            required:true
        }
    },
    {
        timestamps:true
    }
);
const Master=mongoose.model("master",masterSchema);
const savingsSchema=new mongoose.Schema(
    {
        acnum:{type:Number,unique:true,required:true},
        balance:{type:Number,required:true},
        interest:{type:Number,required:true},
        masterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"master",
            required:true
        }
    },
    {
        timestamps:true
    }
);
const Savings=mongoose.model("savings",savingsSchema);
const fixedSchema=new mongoose.Schema(
    {
        acnum:{type:Number,unique:true,required:true},
        balance:{type:Number,required:true},
        interest:{type:Number,required:true},
        start:{type:Date,required:true},
        maturity:{type:Date,required:true},
        masterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"master",
            required:true
        }
    },
    {
        timestamps:true
    }
);
const Fixed=mongoose.model("fixed",fixedSchema);
app.get("/user",async(req,res)=>{
    try{
        const user=await User.find().lean().exec();
        return res.send(user)
    }
    catch(error){
        console.log(error);
    }
});
app.post("user/:userId/savings",async(req,res)=>{
    try {
        const savings=await Savings.create(req.body);
        return res.send;
    } catch (error) {
        console.log(error)
    }
});
app.post("/user",async(req,res)=>{
    try {
        const user=await User.create(req.body);
        return res.send(user)
    } catch (error) {
        console.log(error)
    }
})
app.post("user/:userId/fixed",async(req,res)=>{
    try {
        const fixed=await Fixed.create(req.body);
        return res.send;
    } catch (error) {
        console.log(error)
    }
});
app.get("/master",async(req,res)=>{
    try {
        const master=await Master.find().lean().exec();
        return res.send(master)
    } catch (error) {
        console.log(error)
    }
});
app.get("/master/:masterId/user",async(req,res)=>{
    try {
        const user=await User.find({masterId:req.params.masterId}).populate(["acnum","balance"]).lean().exec();
        return res.send(user);
    } catch (error) {
        console.log(error)
    }
});
app.listen(2002,async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    };
    console.log(5001);
})
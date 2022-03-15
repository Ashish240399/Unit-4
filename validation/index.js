const express=require("express");
const mongoose=require("mongoose");
const { body, validationResult } = require("express-validator");
const app=express();
app.use(express.json());
const connect=()=>{
    return mongoose.connect("mongodb+srv://Ashish7797:Ashish7797@cluster0.3get3.mongodb.net/validation?authSource=admin&replicaSet=atlas-5sws42-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
}
const userSchema=new mongoose.Schema(
    {
        first_name:{type:String,required:true},
        last_name:{type:String,required:true},
        email:{type:String,required:true},
        pincode:{type:Number,required:true},
        age:{type:Number,required:true},
        gender:{type:String,required:true},
    },
    {
        versionKey:false,
        timestamps:true
    }
);
const User=mongoose.model("user",userSchema);
app.post("/users",
    body("first_name").trim().not().isEmpty().withMessage("First name can't be empty").isLength({min:4}).withMessage("Name must of at least 4 characters"),
    body("last_name").trim().not().isEmpty().withMessage("Last name can't be empty").isLength({min:4}).withMessage("Name must of at least 4 characters"),
    body("email").isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email has already taken");
      }
      return true;
    }),
    body("pincode").not().isEmpty().custom((value)=>{
        if(!value.length==6){
            throw new Error("Inappropriate Pincode");
        }
        return true;
    }),
    body("age").not().isEmpty().custom((val) => {
        if (val < 1 || val > 100) {
          throw new Error("Incorrect age provided");
        }
        return true;
        }),
    body("gender").not().isEmpty().custom((value)=>{
        if(!value=="Male" || !value=="Female" || !value=="Others"){
            throw new Error("Inappropriate Gender");
        }
        return true;
    }),async(req,res)=>{
        try {
            const errors = validationResult(req);
            console.log({ errors });
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }

            const user = await User.create(req.body);

            return res.status(201).send(user);
        } catch (error) {
            return res.status(500).send({ message: err.message });
        }
    }
)
app.listen(2002,async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("NO")
    }
    console.log("Connected to 2002");
})


//mongodb+srv://Ashish7797:Ashish7797@cluster0.3get3.mongodb.net/validation?authSource=admin&replicaSet=atlas-5sws42-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
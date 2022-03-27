const jwt=require("jsonwebtoken")
require('dotenv').config()
const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.SECRET_KEY,function(err,decoded){
            if(err){
                return reject(err);
            }
            return resolve(decoded);
        });
    })
}
const authenticate=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send("Authorization failed");
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.send("Authorization failed")
    }
    const token=req.headers.authorization.split(" ")[1];
    let decoded;
    try {
        decoded=await verifyToken(token);
    } catch (error) {
        console.log(error);
    }
    console.log(decoded.user);
    req.user = decoded.user;
    return next();
}
module.exports=authenticate;
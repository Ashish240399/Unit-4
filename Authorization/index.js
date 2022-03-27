const express=require("express");
const app=express();
const userController=require("./controller/user.controller");
const productController=require("./controller/product");
const {register,login,newToken}=require("./controller/authenticate");
const passport=require("./config/google")
app.use(express.json());
app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);
app.use("/products",productController);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false }),
  function(req, res) {
    const token = newToken(req.user)
    return res.status(200).send({user:req.user, token})
  });
module.exports=app;

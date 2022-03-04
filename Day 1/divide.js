const values=require("./main");
const a=values.a;
const b=values.b;
function divide(a,b){
    console.log(Math.floor(a/b)) ;
};
divide(a,b);
module.exports=divide;
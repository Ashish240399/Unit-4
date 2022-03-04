const values=require("./main");
const a=values.a;
const b=values.b;
function add(a,b){
    console.log(a+b);
};
add(a,b);
module.exports=add;
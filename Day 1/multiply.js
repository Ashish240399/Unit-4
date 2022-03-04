const values=require("./main");
const a=values.a;
const b=values.b;
function multi(a,b){
    console.log(a*b) ;
};
multi(a,b);
module.exports=multi;
const values=require("./main");
const a=values.a;
const b=values.b;
function sub(a,b){
    console.log(a-b) ;
};
sub(a,b);
module.exports=sub;
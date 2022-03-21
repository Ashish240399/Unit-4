const multer=require("multer");
const path=require("path");
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../myBooks"))
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now()
      cb(null,uniquePrefix + '-' + file.originalname)
    }
  })
  function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:
    
  
    // To accept the file pass `true`, like so:
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        cb(null, true)
    }
    else{
        cb(new Error('I don\'t have a clue!'),false)
    }
  
    // You can always pass an error if something goes wrong:
    
  }  
  const options={
    storage,
    fileFilter,
    limits:{
        fileSize:1024*1024*5,
    }
  };
  const uploads=multer(options);
  module.exports=uploads;
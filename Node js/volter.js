const express= require("express")

const app=express()
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const { error } = require("console")

const newPath=path.join(__dirname,"media");

if (!fs.existsSync(newPath)){
    fs.mkdir(newPath,()=>{
        console.log("file created successfully")
    })
}
const Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,newPath)
    },
filename:function(req,file,cb){cb(null,file.originalname)}
})
const fileFilter=(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/jpg","image/png"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);

    }
    else{
        cb(new error("invallid fike type"));
    }
}
const upload=multer({storage:Storage});
app.post("/data",upload.single("profile_pic"),(req,res)=>{
    console.log(req.file);
    res.status(200).send("uploaded successfully")
})



app.listen(3125,()=>{
    console.log("server running on 3125")
})
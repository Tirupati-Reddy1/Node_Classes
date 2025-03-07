const bcrypt=require("bcrypt");
let password= "REDDY@1234"
const fs=require("fs")

bcrypt.hash(password,10,(err,hash)=>{
    if(err){
        console.log(err);
        
    }else{
        fs.writeFile("./password.txt",hash,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("password added successfully")
            }
        })
    }
})
let hashedfile=fs.readFile("./password.txt","utf8",(err,data)=>{
    // console.log("something wenjrgjbrgh")
    if(err){
        console.log(err)

    }
    else{
        let storedData=data;
        bcrypt.compare(password,storedData,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                if(result){
                    console.log("correct password")
                }
                else{
                    console.log("failed to match")
                }
            }
        })
    }
})
const express = require("express");
const app = express();
is_eligible=true

app.use((req,res,next)=>{
    if(true){
        console.log("im middleware 1");
        next()
    }
    else{
        console.log("some error")
    }
    
});
app.use((req,res,next)=>{
    if(is_eligible){
        console.log("im middleware 2");
    }
    else{
        console.log("some error")
    }

});

app.listen(3100,()=>{
    console.log("Server running on port number 3100")
});



const express=require("express");
const { stringify } = require("querystring");
const app=express();
const fs=require("fs").promises
app.use(express.json())

app.get("/data",async(req,res)=>{
    try{
    let existingData=JSON.parse( await fs.readFile("./sample.json","utf8"));
    console.log(existingData);
    if(err){
        res.send(err)

    }
    else{
        res.send(data)
    }
}
catch(err){
    res.send(err)
}



});
app.post("/data",async(req,res)=>{
    // let inputData=req.body
    let {name,email } =req.body

    // console.log(inputData,"this is input data")

    let existingData =JSON.parse(await fs.readFile("./sample.json","utf8"))
    let result=existingData.some((x,y)=>{
        return x.email===email
    })
    if(!result){
        existingData.push({"name":name,"email":email});
        await fs.writeFile("./sample.json",JSON.stringify(existingData))
        console.log(existingData)
        res.send("data added successfully")
    }
    else{
        res.send("alreaady exists")
    }
});

    // await fs.writeFile("./sample.json",JSON.stringify(existingData))







    // // let existingData=JSON.parse(await fs.readFile("./sample.json","utf8"));
    // // existingData.push(inputData)
    // // console.log(existingData,"thjis is my data")
//     await fs.writeFile("./sample.json",JSON.stringify(existingData));
    
//     res.send({"Data inserted Successfully":existingData})
// });

// app.put("/data:email",async(req,res)=>{

//     let requestedEmail=req.params.email.toLowerCase()
//     let existingData=JSON.parse(await fs.readFile("./sample.json","utf8"));
//     let result=existingData.filter((x,y)=>{
// return x.email==requestedEmail
//     });
//     console.log(result)

// })


app.listen(3007,()=>{
    console.log("Server running on port number 3007")
});

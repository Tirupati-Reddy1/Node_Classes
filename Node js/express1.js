const express = require("express");
const app = express();
const fs = require("fs").promises;

app.use(express.json());

// GET request to fetch user data
app.get("/", async (req, res) => {
  try {
    let data = await fs.readFile("./users.json", "utf8");
    res.set({ "content-type": "application/json" });
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ error: "Failed to read data", details: err.message });
  }
});

// POST request to add new data
app.post("/data", async (req, res) => {
  try {
    let data = await fs.readFile("./users.json", "utf8"); // Read file
    let existingData = JSON.parse(data); // Parse JSON
    
    let new_data = { name: "reddy", age: "25", course: "MCA" }; // New entry
    existingData.push(new_data);

    await fs.writeFile("./users.json", JSON.stringify(existingData, null, 2)); // Write updated data

    res.send({ message: "Data inserted successfully", data: new_data });
  } catch (err) {
    res.status(500).send({ error: "Failed to insert data", details: err.message });
  }
});
app.put("/data/:name",async(req,res)=>{

    let {name, age}=req.body
    let existingData=JSON.parse(await fs.readFile("./users.json","utf8"))
    let requestedName=req.params.name;
    let requiredData=existingData.filter((x,y)=>{
        return x.name==requestedName
    });
    console.log(requiredData)
    let reminedData=existingData.filter((x,y)=>{
        return x.name!=requestedName
    })
   
    
})
console.log(reminedData)

app.listen(3006, () => {
  console.log("Server running on port 3006");
});

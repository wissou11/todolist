// Imports et const
const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const port=process.env.port||3000
// Création de node js server
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.listen(port,(err)=>console.log(`Server is running on port : ${port}`))
const db=require("./db/db.js")
const todoRoutes = require("./controller/controller");
const authController  = require("./controller/authController.js");
app.use("/api", todoRoutes);
app.use("/api", authController);

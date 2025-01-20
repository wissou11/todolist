const express=require("express")
const mongoose = require("mongoose")
const todoSchema=new mongoose.Schema({
name:{type:String},
description:{type:String},
done:{type:Boolean},
creation_date:{type:Date},
end_date:{type:Date}
})
const Todo=mongoose.model("todos",todoSchema)
module.exports=Todo

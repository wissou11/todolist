const express=require("express")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

const user=mongoose.model("users",userSchema)
module.exports=user

const mongoose=require("mongoose")
const db=mongoose.connect("mongodb://localhost:27017/todo_db")
.then(()=>'Connexion à la base de données réussie')
.catch((err)=>console.error(err))
module.exports = db

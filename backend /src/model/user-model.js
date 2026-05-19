const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    favorites:[{
        id:Number,
        title:String,
        poster:String,
        media_type:String
    }],
    
})
module.exports=mongoose.model("Users", userSchema)
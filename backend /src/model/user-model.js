const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    liked:[{
        id:Number,
        title:String,
        poster:String,
        media_type:String
    }],
    watchList:[{
        id:Number,
        title:String,
        poster:String,
        media_type:String
    }]
})
module.exports=mongoose.model("Users", userSchema)
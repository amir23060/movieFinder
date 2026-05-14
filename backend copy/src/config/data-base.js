const mongoose =require("mongoose")
const connectDb= async()=>{
try{
   await mongoose.connect(process.env.MONGODB)
   console.log("Mongo connected")
}catch{
    console.error("Mongo not connected")
}
}
module.exports=connectDb
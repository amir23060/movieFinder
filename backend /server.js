const express =require("express")
const cors = require("cors")
const dotenv =require("dotenv")
const connectDb = require("./src/config/data-base")
const userRouter = require("./src/router/user-router")
const app = express() 
dotenv.config()
//MiddleWare
app.use(express.json())
app.use(cors())
//data base
connectDb()
//Router
app.use("/api",userRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

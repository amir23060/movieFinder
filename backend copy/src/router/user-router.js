const express = require("express")
const { register, login, likedMovies, getUser, watch_list } = require("../controller/user-controllers")
const userRouter = express.Router()
userRouter.post("/",register)
userRouter.post("/login",login)
userRouter.post("/liked/:userId",likedMovies)
userRouter.get("/:id", getUser )
userRouter.post("/watchlist/:userId",watch_list)
module.exports=userRouter
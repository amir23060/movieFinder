const User = require("../model/user-model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, try logging in" });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Account created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email is incorrect" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const likedMovies=async(req,res)=>{
    try{
        const {userId}= req.params
        if(!userId){
           return res.status(401).json({message:"Log in first"})
        }
        const {id, title, poster,media_type}=req.body
        const movie = {id,title,poster,media_type}
        const user = await User.findById(userId)
        const existingMovie = user.liked.find(e=> e.id === id)
        if(existingMovie){
            user.liked.pull(existingMovie)
            await user.save()
            return res.status(403).json({message:"Removed from liked"})
        }
        user.liked.push(movie)
        await user.save()
        console.log(user.liked)
        res.status(201).json({message:"Added to likes",liked:user.liked})

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error"});
  }
}
const getUser=async(req,res)=>{
    try{
        const {id}=req.params
        const user = await User.findById(id)
        if(!user){
           return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user)

    }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
const watch_list=async(req,res)=>{
  try{
        const {userId}= req.params
        if(!userId){
           return res.status(401).json({message:"Log in first"})
        }
        const {id, title, poster,media_type}=req.body
        const movie = {id,title,poster,media_type}
        const user = await User.findById(userId)
        const existingMovie = user.watchList.find(e=> e.id === id)
        if(existingMovie){
            user.watchList.pull(existingMovie)
            await user.save()
            return res.status(403).json({message:"Removed from watch list"})
        }
        user.watchList.push(movie)
        await user.save()
        res.status(201).json({message:"Added to watchlist"})

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error"});
  }

}
   

module.exports = { register, login,likedMovies,getUser,watch_list};
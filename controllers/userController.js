const User = require("../models/User");

const updateUser = async (req,res,next)=>{
    const id=req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  const deleteUser = async (req,res,next)=>{
    const id=req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("user has been deleted");
    } catch (error) {
        next(error)
    }
  }

const getUser=async (req,res,next)=>{
    const id=req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
}

const getAllUsers=async (req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        next(err);
      }
}

module.exports={updateUser,deleteUser,getUser,getAllUsers};
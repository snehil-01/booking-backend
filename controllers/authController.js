const User = require("../models/User");
const bcrypt = require('bcryptjs');
const createError = require("../utils/error");
const jwt = require('jsonwebtoken');

const register=async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser=await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
}

const login=async (req,res,next)=>{
    try {
       const user=await User.findOne({username:req.body.username});
       if(!user) return next(createError(404,"user not found!")); 

       const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
       if(!isPasswordCorrect) return next(createError(400,"wrong username/password!"))
       
       const token=jwt.sign({userId:user._id,isAdmin:user.isAdmin},
        process.env.JWT
        );

       const {password,isAdmin,...otherDetails}=user._doc;
       
       res.cookie("access_token",token,{
        httpOnly:true
       });
       
       res.status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
}
module.exports={register,login}
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const createError = require('./error');

const verifyToken=async (req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token)
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }
    
    try {
        const decoded=await jwt.verify(token,process.env.JWT);
        const user=await User.findById(decoded.userId).select('-password');
        req.user=user;
        // console.log(decoded)
        next();
    } catch (error) {
       return next(error);
    }
}

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
             return next(createError(403,"You are not authorized!"))
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"Only Admin are allowed to do that!"))
        }
    })
}
module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};
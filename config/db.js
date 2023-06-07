const mongoose = require("mongoose");

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(err){
        throw err;
    }
  };
  
  module.exports = connectDB;
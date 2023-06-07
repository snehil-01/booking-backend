const express = require('express');
const app = express();

const dotenv=require('dotenv');
dotenv.config()

const connectDB=require('./config/db');
connectDB();

const cookieParser=require('cookie-parser');
const port=process.env.PORT;

const authRoute=require('./routes/auth')
const hotelsRoute=require('./routes/hotels')
const roomsRoute=require('./routes/rooms')
const usersRoute=require('./routes/users');

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/hotels",hotelsRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

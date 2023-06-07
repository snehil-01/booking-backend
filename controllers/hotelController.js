const Hotel = require("../models/Hotel");

const createHotel=async (req,res,next)=>{
    try {
        const hotel=await Hotel.create(req.body);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

const updateHotel=async (req,res,next)=>{
    const id=req.params.id;
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(id,
            {$set : req.body},
            { new: true});
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
}

const deleteHotel=async (req,res,next)=>{
    const id=req.params.id;
    try {
        await Hotel.findByIdAndDelete(id);
        res.status(200).json("hotel has been deleted");
    } catch (error) {
        next(error)
    }
}

const getHotel=async (req,res,next)=>{
    const id=req.params.id;
    try {
        const hotel=await Hotel.findById(id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

const getAllHotels=async (req,res,next)=>{
    try {
        const hotels=await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

const countByCity=async (req,res,next)=>{
    const cities=req.query.cities.split(",");
    try {
        const list=await Promise.all(cities.map(city=>{
            console.log(city)
            return Hotel.countDocuments({city:city})
        }))
        res.status(400).json(list); 
    } catch (error) {
        next(error)
    }
}
module.exports={createHotel,updateHotel,deleteHotel,getHotel,getAllHotels,countByCity};
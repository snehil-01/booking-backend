const express=require('express');
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity } = require('../controllers/hotelController');
const { verifyTokenAndAdmin } = require('../utils/verifyToken');
const router=express.Router();


router.post("/",verifyTokenAndAdmin,createHotel);
router.put("/:id",verifyTokenAndAdmin,updateHotel);
router.delete("/:id",verifyTokenAndAdmin,deleteHotel);
router.get("/find/:id",getHotel);
router.get("/",getAllHotels);
router.get("/countByCity",countByCity)

module.exports=router;

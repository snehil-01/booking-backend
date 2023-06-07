const express=require('express');
const { createRoom, deleteRoom, updateRoom, getRooms, getRoom } = require('../controllers/roomController');
const { verifyTokenAndAdmin } = require('../utils/verifyToken');
const router=express.Router();


router.post("/:hotelid", verifyTokenAndAdmin, createRoom);
// router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyTokenAndAdmin, updateRoom);
router.delete("/:id/:hotelid", verifyTokenAndAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);

module.exports=router;
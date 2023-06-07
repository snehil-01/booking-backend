const express=require('express');
const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../utils/verifyToken');

const router=express.Router();

router.put("/:id",verifyTokenAndAuthorization,updateUser);
router.delete("/:id",verifyTokenAndAuthorization,deleteUser);
router.get("/:id",verifyTokenAndAuthorization,getUser)
router.get("/",verifyTokenAndAdmin,getAllUsers);
module.exports=router;
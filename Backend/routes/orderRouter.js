const express = require("express");
const Order = require("../Models/Order")
const { protect} = require ("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private

router.get("/my-order", protect , async(req,res)=>{

  try {
    const order = await Order.find({user : req.user._id}). sort({
      createdAt: -1 ,
    })
    res.json(order)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"})
  }
})

// @route GET /api/orders/:id
// @desc Get orders details by Id
// @access Private

router.get("/:id", protect , async(req, res)=>{
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the order
    return res.json(order)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    
    
  }
})

module.exports = router
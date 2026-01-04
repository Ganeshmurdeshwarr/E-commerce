const express = require("express");
const router = express.Router()
const Subscriber = require("../Models/Subscriber")

// @route POST / api/subscribe
// @desc Handle newsletter subscription
// @access Public

router.post("/subscribe", async(req, res)=>{
  const {email} = req.body;

  if(!email){
    res.status(400).json({message:"Email is require"})
  }
  try {
    // Check if the email is already subscribed

    let subscriber = await Subscriber.findOne({email})

    if(subscriber){
      res.status(400).json({message:"Email is already Subscribed"})
    }
    // Create new subscriber

    subscriber = new Subscriber({email});
    await subscriber.save()
    res.status(201).json({message:"Successfully subscribed to newsletter!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

module.exports = router;
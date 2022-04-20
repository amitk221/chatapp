const router = require("express").Router();
const User = require("../Models/user/userModels");
const Message = require("../Models/Message/messageModel");

//add a message





router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    try {
      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// get conversation


router.get("/:conversationId", async (req, res) => {
    try {
      const message = await Message.find({CoversationId:req.params.conversationId});
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

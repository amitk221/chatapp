const router = require("express").Router();
const Conversation = require("../Models/Coversation/Coversation");
const User = require("../Models/user/userModels");


// new conversation


router.post("/", async (req, res) => {
  console.log("req.body" ,req.body )
    const newConversation = new Conversation({
        members:[req.body.senderId ,req.body.recieverId]
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(201).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// get conversation


router.get("/:userId", async (req, res) => {
    try {
      const conversations = await Conversation.find({ members: { $in: [req.params.userId] } });
      res.status(200).json(conversations);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;

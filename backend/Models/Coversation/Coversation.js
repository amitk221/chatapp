const mongoose = require("mongoose");

const CoversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array
    },
    onlineStatus:{
      type: Number,
      enum: [0 , 1],
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coversation", CoversationSchema);

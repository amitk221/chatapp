const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let requestSchema = new Schema({
   requestedBy:{
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  //  autopopulate: true
   },
   requestedTo:{
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true
   },
    status:{
    type : Number,
    required : true
},


},{ timestamps: true })

requestSchema.plugin(require('mongoose-autopopulate'));


const FriendRequests = new mongoose.model("FriendRequests" , requestSchema);
module.exports = FriendRequests;
const express = require("express");
const FriendRequests = require('../../Models/request Model/requestModel');

const Users = require('../../Models/user/userModels');

var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const Controllers = require('../../Controllers/user/userControllers')
const reqFriend = express.Router();
const auth = require("../../middleware/auth");
const fetch = require('node-fetch');





// add friend api
reqFriend.post("/add-friend/:newFrndId" , auth, async (req, res)=>{
    try{
        const newFrndId = req.query.newFrndId || req.params.newFrndId;
        const myId = req.user._id;

        if(myId.toHexString() === newFrndId){
           
           return res.status(200).jsonp({
                message: "You cant't send request yourself",
                data:[]
            })
        }
        // status code meaning
        // 1 i.e requested friend
        // 0 : not requested or after decline 
        // 2 : after friend
       const user = await Users.findOne({_id : newFrndId})
        try{
            const requestedDetail  =  await FriendRequests.findOne({requestedBy : newFrndId ,requestedTo : myId}) || await FriendRequests.findOne({requestedBy : myId ,requestedTo : newFrndId});
            console.log(requestedDetail);
            if(requestedDetail.status === 1){
                res.status(200).jsonp({
                    message: "Already  Friend request sent or You have recived.",
                    data:requestedDetail
                })
            }else if( requestedDetail.status === 2) {
                res.status(200).jsonp({
                    message: "You can't sent request . User is already your friend.",
                    data:requestedDetail
                })
              } else {
                // FOR CASE STATUS 0
                requestedDetail.status = 1;
                let sentRequest =await requestedDetail.save(); 
                res.status(200).jsonp({
                    message: "Sucessfully Sent Friend Request.",
                    data:sentRequest
                })
              }
        } catch {
            const createFriendReq = new FriendRequests({
                requestedBy : myId,
                requestedTo : newFrndId,
                status  : 1
              });
              let sentRequest =await createFriendReq.save(); 
              res.status(200).jsonp({
                message: "Sucessfully Sent Friend Request.",
                data:sentRequest
            })
        }

  
     
     }catch(err){
         console.log(err)
         res.status(400).jsonp({
            message: "Unable to send Friend Request. Please try after some time.",
            data:[],
            err: err
        })
     }
    //res.send("hh")
});



reqFriend.get("/all-Users", auth, async(req , res)=>{
    try{
        const myId = req.user._id;
        const keyword = req.query.search
        ? {
            $or: [
              { username: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
       const allUsers = await Users.find(keyword).find({ _id: { $ne: req.user.id }});
       console.log(allUsers)
       res.status(200).json({
        data:allUsers,
        message:"All Results."
    })
    } catch(err){
        res.status(400).json({
            data:[],
            err: err
        })
    }
})

reqFriend.get("/received-request" ,auth , async(req , res)=>{
    try{
        const myId = req.user._id;
    //    {$match:{name:"whatever"}
    console.log('recived req route')
       const receivedReq = await FriendRequests.find({requestedTo: myId , status: 1}).populate("requestedBy");
       console.log("recived req" ,receivedReq)
       res.status(200).json({
        message: "List of all recived friends request",
        data:receivedReq
    })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err,
            data:[]
        })
    }
})


reqFriend.get("/sent-request" ,auth, async(req , res)=>{
    try{
        const myId = req.user._id;
       const sentReq = await FriendRequests.find({requestedBy: myId , status: 1});
       res.status(200).json({
        message: "List of all sent friends request",
        data:sentReq
    })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err,
            data:[]
        })
    }
})


reqFriend.get("/friends-list" ,auth , async(req , res)=>{
    try{

        //  $or:[ 
    //    {'condition_1':param}, {'condition_2':param} 
    // ]
        const myId = req.user._id;
       const friends = await FriendRequests.find({ $or:[  {'requestedBy':myId}, {'requestedTo':myId} ] , status: 2}).populate('requestedBy').populate("requestedTo"); 
        console.log("friends" , friends)
       res.status(200).jsonp({
        message: "List of all friends ",
        data:friends
    })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err,
            data:[]
        })
    }
})




reqFriend.post("/accept-request/:requestedById" ,auth, async(req , res)=>{
    try{
        console.log("enter")
        const myId = req.user._id;
        const receivedReq = await FriendRequests.findOne({requestedTo: myId ,  requestedBy: req.params.requestedById ,status: 1});
        receivedReq.status = 2;
        const accepted  = await receivedReq.save();
        console.log('accept')
        // create convsersation
     // req.body.senderId ,req.body.recieverId
        const body = {
            senderId : req.params.requestedById,
            recieverId :  myId
        } ; // JSON.stringify(body)

        console.log("Body accept frnd" , body)

        const response = await fetch(`${req.protocol}://${req.headers.host}/api/v1/conversation`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json));

       // const data = await response.json();

      //  console.log(data);
       res.status(200).json({
        message: "Request is accepted! ",
        data:accepted
    })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err,
            data:[]
        })
    }
})

reqFriend.get("/decline-request" ,auth, async(req , res)=>{
    try{
        const myId = req.user._id;
       const receivedReq = await FriendRequests.findOne({requestedTo: myId , status: 1});
       receivedReq.status = 0;
        const accepted  = await receivedReq.save();
       res.status(200).json({
        message: "Request is declined succesfully! ",
        data:accepted
    })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err,
            data:[]
        })
    }
})


module.exports = reqFriend;
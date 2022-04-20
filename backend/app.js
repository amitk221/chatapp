const express  = require('express');
const app = express();
const port = 8001;
const user = require('./Routes/user/userRoute');
const reqFriend = require('./Routes/user/reuestFriends');
const product = require('./Routes/product/productRoute');
//const chatRoute = require('./Routes/chat/chatRoute')
const messageRoute = require('./Routes/message')
const conversationRoute = require('./Routes/conversations')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')
require("dotenv").config();

 
app.use(cors())
app.use('/Uploads', express.static('Uploads'));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

const db = 'mongodb+srv://myChatapp:NtxksWb5Eken1FIi@cluster0.1nbnl.mongodb.net/myChatapps?retryWrites=true&w=majority'

mongoose.connect(db , {
    
}).then(() => {
    console.log(`connection successfull`);
}).catch((e) => {
    console.log(`connection unsuccessfull`);
})

// // users route
 app.use("/api/v1/users" ,user)
 app.use("/api/v1/social" ,reqFriend)
 //app.use("/api/v1/chat" ,chatRoute)
 app.use("/api/v1/message", messageRoute);
 app.use("/api/v1/conversation", conversationRoute);
 

 // // product route
 app.use("/api/v1/product" ,product)


 app.get("/test" ,  async(req , res)=>{
     console.log(req.headers.host);
     res.send(`hi`)
 })
app.listen(port, (req ,res)=>{
    console.log(`server started at ${port} & `)
})
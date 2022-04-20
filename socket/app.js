const io = require('socket.io')(8901 , {
    cors:{
        origin:"http://localhost:3000",
    },
});


var users = [];

// add user
const addUser = (userId ,socketId)=>{
    !users.some((id) => id.userId === userId)&&
    users.push({userId ,socketId})
}

// remove user from array
const removeUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId)
}

// get user from array
const getUser = (userId)=>{
    return users.find(user => user.userId == userId)
}

io.on("connection" , (socket)=>{
    // when connect
    console.log("a user connection" , socket.id)

    //take userid and socketId from userId
    socket.on("addUser" , (userId)=>{
        addUser(userId ,socket.id);
       // console.log('connected')
        io.emit("getUsers" , users)
    })

    //send and get message
    socket.on("sendMessage" , ({senderId , receiverId , text})=>{
        console.log("msg" , senderId , receiverId , text)
        const receiver = getUser(receiverId);
        console.log("user" ,receiver )
        receiver && io.to(receiver.socketId).emit("getMessage" , {
            senderId,
            text
        })
    })


    // when disconnecte
    socket.on("disconnect" , (userId)=>{
       removeUser(socket.id);
      //  console.log("disconnected")
      io.emit("getUsers" , users)
    })
  
})
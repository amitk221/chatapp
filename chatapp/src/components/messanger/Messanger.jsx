import React , {useContext , useState , useEffect , useRef} from 'react'
import {useSelector , useDispatch } from 'react-redux';

import Convertation from '../conversation/Convertation'
import Message from '../message/Message';
import ChatOnline from '../chat Online/ChatOnline'
import './messanger.css'
import axios from 'axios';
import {io} from "socket.io-client"
const baseUrl = process.env.REACT_APP_BASE_URL;
//

export default function Messanger() {
const [conversation , setConversation] = useState([]);
const [message , setMessage] = useState([]);
const [currentChat , setCurrentChat] = useState(null);
const [newMessage , setNewMessage] = useState([]);
const [newArrivalMessage , setArrivalNewMessage] = useState({});
const [onlineUsers, setOnlineUsers] = useState([]);
const user = useSelector((state)=> state.user.value)

const scrollRef = useRef();
const socket = useRef()

 console.log("user Mesager compo" ,user)



// // sockets
useEffect(()=>{
    console.log("yes get mesg" );
    socket.current =io("ws://localhost:8901");
    // get message
    socket.current.on("getMessage" , (data)=>{
        console.log("getmEssage" , data)
        setArrivalNewMessage({
            sender :data.senderId,
            text: data.text,
            createdAt: Date.now()
        })
    })
   
      
  },[]);
  
  
  useEffect(()=>{
    newArrivalMessage &&
     currentChat?.members.includes(newArrivalMessage.sender) &&
    setMessage((prevMessage)=>[...prevMessage , newArrivalMessage])

  },[newArrivalMessage , currentChat])

  // // sockets
  // useEffect(()=>{
  //    socket?.on("welcome" ,message=>{
  //        console.log(message)
  //    })
  //   },[socket])
    
  
    
  
  // add users
  useEffect(()=>{
    socket.current.emit("addUser" , user._id);
    socket.current.on("getUsers" , users=>{
       // const onlinefromfollowings = user.followings.filter((f) => users.some((u) => u.userId === f))
      setOnlineUsers([...users]);
    });
      },[user])
      

// get conversation list by user id-
useEffect(()=>{
    const getConversation = async()=>{
        try{
            const res = await axios.get(`${baseUrl}/conversation/${user._id}`);
          //  console.log("res" , res)
            setConversation(res.data)
        } catch(err){
            console.log(err)
        }
    }
    getConversation();
},[user._id])

// get message by conversation -
useEffect(()=>{
    const getmessage = async()=>{
        try{
            const res = await axios.get(`${baseUrl}/message/${currentChat?._id}`);
            //console.log("message" , res)
            setMessage(res.data)
  
        } catch(err){
            console.log(err)
        }
    }
    getmessage();
},[currentChat])


// send message button 
const handleSubmit = async(e)=> {
    e.preventDefault();
    const message = {
        sender: user._id,
        text:newMessage,
        CoversationId: currentChat._id
    }
     const receiverId = currentChat.members.filter(userId => userId !== user._id)
    // sendMessage from socket
    onlineUsers.filter(user => user.userId === user._id) &&
    socket.current.emit("sendMessage" , {
        senderId: user._id,
        receiverId,
        text:newMessage
    });
    
    try{
        const res = await axios.post(`${baseUrl}/message` , message);
       // console.log("message" , res)
        setMessage((prevMessage)=>[...prevMessage , res.data])
        setNewMessage("")
        // **
    } catch(err){
        console.log(err)
    }
    
}

// scroll down when msg changes
//  i didnot add 64th line due we have also another person message , if i put here than it will scroll down only when 
// our message will added 
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
},[message])



// console.log("mes1" ,message)
  return (
    <>
       
       <div className='messanger'>

            <div className="chatMenu">
                <div className="chatMenuWrapper">
                     <input className='chatMenuInput' type="text" placeholder='Search for friends' />
                   {conversation &&  conversation.map((conversation)=> 
                      <div onClick={()=>setCurrentChat(conversation)}>
                           <Convertation key={conversation._id} conversation={conversation} currUser={user} />
                      </div>
                    )}
                   
                </div>

            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                {currentChat ? 
                ( <> 
                 <div className="chatBoxTop">
                  {message && message.map((m)=>
                     <div ref={scrollRef} key={m._id}>
                         <Message  own={m.sender=== user._id}  message={m}/>
                     </div>
                  )}
                   
                    
                 </div>
                 <div className="chatBoxBottom">
                       <textarea
                             className='chatMessageInput'
                             placeholder='Write your message'
                             onChange={(e)=> setNewMessage(e.target.value)}
                             value={newMessage}
                       >
                      </textarea>
                       <button className='chatSubmitBtn' onClick={handleSubmit}>Send</button>
                 </div>
                 </> ) : (<span className="noConversatationText" >Open a conversation to start Chat</span>)
                 }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                   {onlineUsers.map(user=>
                        <div key={user}>
                             <ChatOnline user={user} />
                        </div>
                    )}
                    
                </div>
            </div>

       </div>
    </>
  )
}

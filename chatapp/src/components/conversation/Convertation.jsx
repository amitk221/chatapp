import React , {useState , useEffect} from 'react';
import axios from 'axios'
import './conversation.css'

export default function Convertation(props) {
    const userProfileImg = 'https://www.pinclipart.com/picdir/big/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png'
    const{ conversation , currUser }= props;
    const [user , setUser] = useState(null)

// members
    useEffect(()=>{
        const getUsers = async()=>{
            console.log("currUser" , currUser._id.toString() )
            const friendId = conversation.members.find((m)=> m !==  currUser._id.toString());
            console.log("frindid" ,friendId)
            try{
                const res = await axios.get(`http://localhost:8001/api/v1/users?userId=${friendId}`);
                console.log("friendid detail" , res)
                setUser(res.data)
            } catch(err){
                console.log(err)
            }
        }
        getUsers();
    },[conversation ,currUser])

    console.log("conversation" , conversation)
  return (
   <>
       <div className='conversation'>
           <img className='conversatinImg' src={userProfileImg} alt='anIMg' />
           <span className="coversationName">{user ? user.username : "...Loading"}</span>
       </div>
   </>
  )
}

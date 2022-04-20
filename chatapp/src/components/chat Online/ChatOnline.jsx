import React , {useState ,useEffect} from 'react'
import axios from 'axios'
import './chatOnline.css'

export default function ChatOnline(props) {
  const [onlineUser , setOnlineUser] = useState(null)
  useEffect(()=>{
    const onlineUserDetail = async()=>{
      try{
        console.log("propsOnline" ,props.user)
        const user = props.user;
         const res = await axios.get(`http://localhost:8001/api/v1/users?userId=${user.userId}`);
         console.log("online" , res)
         setOnlineUser(res.data)
      } catch(err){
        console.log(err)
      }
    }
    onlineUserDetail();
  },[props.user])
  const userProfileImg = 'https://www.pinclipart.com/picdir/big/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png'

  return (
    <>
        <div className="chatOnline">
          <div className="chatOnlineFriend" >
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src={userProfileImg} alt='myImg' />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{onlineUser ? onlineUser.username : "...Loading"}</span>
           </div>
        </div>
    </>
  )
}

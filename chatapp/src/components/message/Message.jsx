import React from 'react';
import { format } from 'timeago.js';
import './message.css'
export default function Message({own , message}) {
    const userProfileImg = 'https://www.pinclipart.com/picdir/big/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png'
    
  return (
   <>
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                  <img className="messageImg" src={userProfileImg} alt="mypic" />   
                  <p className="messageText">{message.text}</p>       
            </div>
                    
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
   </>
  )
}

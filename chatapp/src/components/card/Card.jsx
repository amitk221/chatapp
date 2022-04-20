import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector , useDispatch } from 'react-redux';
import {useNavigate } from 'react-router'
const baseUrl = process.env.REACT_APP_BASE_URL


const url = '/social';
export default function Card(props) { 
  
    const token = useSelector((state)=> state.token.value)
    let navigate = useNavigate();
    // request a friend
    const sendFriendRequest = (e)=>{
      e.preventDefault();
      axios.post(`${baseUrl}${url}/add-friend/${props.id}?token=${token}`)
      .then(function (response) {
        alert(`${response.data.message}`)
        console.log(response);
        localStorage.setItem('islog', true);
      })
      .catch(function (error) {
        alert("error")
        console.log(error);
      });
      
    }

    // accept a requested
   const acceptFriendRequest =   (e)=>{
    e.preventDefault();
    axios.post(`${baseUrl}${url}/accept-request/${props.id}?token=${token}`)
    .then(function (response) {
      alert(`${response.data.message}`)
      console.log(response);
      //localStorage.setItem('islog', true);
    })
    .catch(function (error) {
      alert("error")
      console.log(error);
    });
    
  } 

const navigateToMessanger =(e)=>{
  e.preventDefault();
  navigate("/messanger");
  
} 

console.log("props" ,props);

    const btnChangerAccordingToSatus=()=>{
      console.log('switch')
      switch(props.status) {
        case 1:
          
          return (<><button onClick={acceptFriendRequest} className="btn btn-primary">accept</button></>)
          break;
        case 2:
          return (<><button onClick={navigateToMessanger} className="btn btn-primary">chat</button></>)

          // code block
          break;
        default:
          return (<><button onClick={sendFriendRequest} className="btn btn-primary">Send Friend Request</button></>)

          // code block
      }
    }



  return (
  <>
    <div className="card" style={{"width": "18rem"}}>
      
        <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">{props.email}</p>

            {props.status ? btnChangerAccordingToSatus():<button onClick={sendFriendRequest} className="btn btn-primary">Send Friend Request</button>}
            
           
        </div>
    </div>
  </>
  )
}

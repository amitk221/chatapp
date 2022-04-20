
import Card from '../card/Card'
import React , {useState , useEffect} from 'react'
import axios from 'axios';
import {useSelector , useDispatch } from 'react-redux';
const url = '/social/friends-list';
const baseUrl = process.env.REACT_APP_BASE_URL;



export default function MyFriends() {


const [data , setData] = useState([]);
const token = useSelector((state)=> state.token.value)
const mydata = useSelector((state)=> state.user.value)
useEffect(()=>{
  axios.get(`${baseUrl}${url}?token=${token}`)
  .then(function (response) {
    setData([...response.data.data]);
    console.log(response.data.data);
   
   // console.log(setData);
  })
  .catch(function (error) {
    alert("error")
    console.log(error);
  });
},[])
  return (
    <>
          <div className="container my-3">
                  <h2 className="text-center">My friends</h2>
                        <div className="row"> 
                           
                        {data.map((user)=>{
                          console.log("my frnd" ,user)
                          return (
                                  <div key={user._id}  className="col-md-4">
                                       <Card id={user._id} name={user.requestedTo._id ===mydata._id ? user.requestedTo.username: user.requestedBy.username} email={user.requestedTo._id ===mydata._id ? user.requestedTo.email : user.requestedBy.email} status={user.status}/>
                                   </div>
                        );})}
                        </div>
                    </div>
    </>
  )
}

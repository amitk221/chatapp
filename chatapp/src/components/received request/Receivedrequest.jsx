import React , {useState , useEffect} from 'react'
import axios from 'axios';
import {useSelector , useDispatch } from 'react-redux';

import Card from '../card/Card'
const url = '/social/received-request';
const baseUrl = process.env.REACT_APP_BASE_URL;



export default function Receivedrequest() {

const [data , setData] = useState([]);
const token = useSelector((state)=> state.token.value)
useEffect(()=>{
  axios.get(`${baseUrl}${url}?token=${token}`)
  .then(function (response) {
    setData([...response.data.data]);
    console.log(response.data.data);
    localStorage.setItem('islog', true);
   // console.log(setData);
  })
  .catch(function (error) {
    alert("error")
    console.log(error);
  });
},[])
console.log(data);
  return (
   <>
      <div className="container my-3">
                  <h2 className="text-center">All Users</h2>
                        <div className="row"> 
                                            
                        {data.map((user)=>{
                          console.log(user._id)
                          return (
                                  <div key={user._id}  className="col-md-4">
                                       <Card id={user._id} name={user.requestedBy.username} email={user.requestedBy.email} id={user.requestedBy._id} status={user.status}/>
                                   </div>
                        );})}
                        </div>
                    </div>

   
   </>
  )
}

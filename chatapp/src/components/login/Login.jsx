import React, { useState, useEffect } from 'react'
import axios from 'axios';

import {useNavigate } from 'react-router'
import {Link} from 'react-router-dom'
import './loginCss.css';
import {useSelector , useDispatch } from 'react-redux';
import {updateToken , deleteToken } from './loginSlice';
import {updateUser , deleteUser } from './userSlice'

export default function Login() {
const [input ,setInput] = useState({});
let navigate = useNavigate();
const token = useSelector((state)=> state.token.value)
const dispatch = useDispatch();
const baseUrl = process.env.REACT_APP_BASE_URL;
// console.log("env" , process.env.REACT_APP_BASE_URL)

// handle inputs
   const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setInput(prevData =>({...prevData , [name] : value}))
   }


// handle value on submit 
const handleSubmit = (e)=>{
    e.preventDefault();
  
   let data = {
        email:input.email ,
        password: input.password 
    } 
    axios.post(`${baseUrl}/users/login`, data)
      .then(function (response) {
        setInput({});
        console.log("udpadte user " , response.data.data)
        dispatch(updateToken(response.data.token));
        dispatch(updateUser(response.data.data));
        navigate("/")
        // console.log(response);
      })
      .catch(function (error) {
        alert("error")
        console.log(error);
      });
console.log("token" ,token)
}

    return (
        <>
            <div className="wrapper">
                <div className="logo"> <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" /> </div>
                <div className="text-center mt-4 name"> ChatApp </div>
                <form onSubmit={handleSubmit} className="p-3 mt-3">
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            value={input.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input
                            type="password"
                            name="password"
                            id="pwd"
                            placeholder="Password"
                            value={input.password}
                            onChange={handleInput}
                        />
                    </div>
                    <button className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">  <Link to="/signup">Sign up</Link> </div>
            </div>
        </>
    )
}

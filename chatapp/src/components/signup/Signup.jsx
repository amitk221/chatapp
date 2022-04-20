import React, { useState, useEffect } from 'react'
import './loginCss.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
const baseUrl = process.env.REACT_APP_BASE_URL;



export default function Login() {
const [input ,setInput] = useState({});
let navigate = useNavigate();


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
        password: input.password ,
        username: input.username 
    } 
    axios.post(`${baseUrl}/users/signup`, data)
    .then(function (response) {
      setInput({});
      console.log(response);
      navigate("/")
      console.log(response);
    })
    .catch(function (error) {
      //setTimeout(setMessage("Something Went wrong ! Please try after some time."), 3000)
      alert("error")
      console.log(error);
    });
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
                            type="text"
                            name="username"
                            id="name"
                            placeholder="full name"
                            value={input.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
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
                    <button className="btn mt-3">Signup</button>
                </form>
                <div className="text-center fs-6"> <Link to="/login">Login</Link> </div>
            </div>
        </>
    )
}

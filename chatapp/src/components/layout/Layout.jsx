import React from 'react';
import {NavLink , Outlet} from 'react-router-dom'

let Layout = ()=>{
    return(
        <>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className="container-fluid">
                        <NavLink  className='navbar-brandS' to='#'>ChatApp </NavLink>
                    

                        <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target='#navbarNavAltMarkup' aria-controls="navNavAltMarkup" aria-expanded="false" arai-label="Toggle naigation"></button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                               <NavLink style={({isActive})=>{return{backgroundColor: isActive ? 'red' : ''}}} className='nav-item nav-link active' to='/'> All Users</NavLink>
                               <NavLink style={({isActive})=>{return{backgroundColor: isActive ? 'red' : ''}}} className='nav-item nav-link ' to='/my-frinds'> My Friends</NavLink>
                               {/* <NavLink style={({isActive})=>{return{backgroundColor: isActive ? 'red' : ''}}} className='nav-item nav-link ' to='/chats'> Chats</NavLink> */}
                               <NavLink style={({isActive})=>{return{backgroundColor: isActive ? 'red' : ''}}} className='nav-item nav-link ' to='/received-request'> Received Request</NavLink>

                               <NavLink style={({isActive})=>{return{backgroundColor: isActive ? 'red' : ''}}} className='nav-item nav-link ' to='/messanger'> Messanger</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet />

        </>
    )
}

export default Layout;
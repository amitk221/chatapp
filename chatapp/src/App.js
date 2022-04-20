import react  , {useEffect} from 'react';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AllUsers from './components/allUsers/AllUsers';
import MyFriends from './components/myfriends/MyFriends';
import Layout from './components/layout/Layout';
import {useSelector  } from 'react-redux';
import Chatapp from './components/chatpage/Chapapp'
import ChatP from './components/chatpage/ChapP'
import Messanger from './components/messanger/Messanger'
import Receivedrequest from './components/received request/Receivedrequest'
import {Route , Routes , Navigate} from 'react-router-dom';
var islog = false ;
var data = {
  "st": "user not logined!"
}
function App() {
  const token = useSelector((state)=> state.token.value)
// useEffect(()=>{
//   localStorage.setItem('islog', true);
//   islog = localStorage.getItem('islog');
// }, [])

  return (
   <>

   <Routes>

            <Route path="/login"  element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
      <Route path="/" element={<Layout />} >
            <Route index element={token ? <AllUsers/> : <Navigate to='/login' replace state={data}/> }></Route>
            <Route path="my-frinds" element={token ? <MyFriends/> : <Navigate to='/login' replace /> }></Route>
            {/* <Route path="chats" element={token ? <ChatP/> : <Navigate to='/login' replace /> }></Route> */}
          {/* // '/received-request' */}
          <Route path="received-request" element={token ? <Receivedrequest/> : <Navigate to='/login' replace /> }></Route>

            <Route path="messanger" element={token ? <Messanger/> : <Navigate to='/login' replace /> }></Route>
      </Route>
   </Routes>
  
   </>
  );
}

export default App;

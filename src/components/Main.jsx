import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home, Nav, Register, Login, Dashboard, DashNav, Administration, PastRoster } from './Index.jsx';
import './Main.css';
import { getMe } from "../api-client/auth.js";


const Main = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const fetchedUser = await getMe(token);
          if (fetchedUser) {
            setUser(fetchedUser.username);
            setIsLoggedIn(true);
            
          }
        } catch (error) {
          console.error('Error fetching user', error)
        }
      }
    };
    fetchUser();
  }, []);


  return (
    <>
    {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/dashboard' && location.pathname !== '/admin' && location.pathname !== '/history' && (
      <Nav />
    )}
      <Routes>
        <Route 
        path='/'
        element={<Home />}
        />
        <Route 
        path='/register'
        element={<Register setUser={setUser} setToken={setToken} setIsLoggedIn={setIsLoggedIn} token={token}/>}
        />
        <Route 
        path='/login'
        element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} setToken={setToken} token={token} user={user} />}
        />
        <Route 
        path='/dashboard'
        element={<Dashboard isLoggedIn={isLoggedIn} setUser={setUser} setToken={setToken}/>}
        />
        <Route 
        path='/admin'
        element={<Administration user={user} token={token}/>}
        />
        <Route 
        path='/history'
        element={<PastRoster />}
        />
      </Routes>
    </>
  );
};

export default Main;

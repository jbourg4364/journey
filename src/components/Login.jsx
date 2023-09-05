import React, { useState, useRef } from 'react';
import { loginUser, getMe } from '../api-client/auth';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({ setIsLoggedIn, setUser, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const inputElement = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userAuth = { username: username, password: password };
        const data = await loginUser(userAuth);

        if (data.token) {
            setIsLoggedIn(true);
            setUsername('');
            setPassword('');
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('currentUser', data.user.username);
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.user.id);
            if (data.user.username == 'admin' && password == 'PPE985252') {
                navigate('/admin/PPEStaff/dashboard')
            } else {
                navigate('/dashboard');
            }
            
        };

        if (!data.token) {
            window.alert('Please register!');
            navigate('/register');
        };
    };

    
  return (
    <div>
        <h1 className="nav-logo">CarQ</h1>
        <h2>Log in to CarQ</h2>
        <form ref={inputElement} onSubmit={handleSubmit}>
            <input 
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='login-input'
            />
            <input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-input'
            />
            <button type="submit" className='login-button'>Log in</button>
        </form>
        <hr></hr>
        <Link to='/register'>
            <p className='login-link'>Don't have an account? Register!</p>
        </Link>
        <Link to='/'>
            <p id='home-button'>Home</p>
        </Link>
    </div>
  )
};

export default Login
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, getMe } from "../api-client/auth";
import './Register.css';

const Register = ({ setToken, setUser, setIsLoggedIn, token }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [children, setChildren] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const inputElement = useRef();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      window.alert('Please use a password that is at least 8 characters.');
    } else if (password !== confirmPass) {
      window.alert('Please make sure your passwords are the same.');
    } else {
      const result = await registerUser({ firstname, lastname, email, children, username, password });

      if (result.token) {
        setToken(result.token);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', result.user.username);
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.user.id);
        window.alert(`Congratulations! You're registered with CarQ!`);
        const fetchedUser = await getMe(token);
        setUser(fetchedUser);
        navigate('/dashboard');
      }
    }
  };

  return (
    <div>
      <h1 className="logo">CarQ</h1>
      <h2 className="school-heading">Pierre Part Elementary School</h2>
      <h2>Sign up to continue</h2>
      <form onSubmit={handleSubmit} ref={inputElement}>
        <input 
          placeholder="First name"
          type="text"
          className="register-input"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
         
          />
        <input 
          placeholder="Last name" 
          type="text"
          className="register-input"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
          />
        <input 
          placeholder="Email" 
          type="email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <input 
          placeholder="Children (seperate with commas)" 
          type="text"
          className="register-input"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
          required
          />
        <input 
          placeholder="Username" 
          type="text"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
        <input 
          placeholder="Password" 
          type="password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <input 
          placeholder="Confirm password" 
          type="password"
          className="register-input"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
          />
        <button className='login-button'>Sign up</button>
      </form>
      <hr></hr>
      <Link to='/login'>
        <p>Already have a CarQ account? Log in</p>
      </Link>
      <Link to='/'>
        <p>Home</p>
      </Link>
    </div>
  );
};

export default Register;

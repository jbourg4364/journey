import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-banner">
      <h1 className="banner-heading">
        CarQ makes carline pickup easier and more efficient than ever
      </h1>
      <h2 className="banner-heading">
        Stay in your car while letting school staff know that you're in line!
      </h2>
      <Link to='/register'>
        <button className="signup-button">Sign up - it's free!</button>
      </Link>
        
    </div>
  );
};

export default Home;
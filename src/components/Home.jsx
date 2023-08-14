import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-banner">
      <h1 className="banner-heading">
        Journey brings all your tasks, teammates, and tools together
      </h1>
      <h2 className="banner-heading">
        Keep everything in the same place—even if your team isn’t.
      </h2>
      <button className='signup-button'>Sign up - it's free!</button>
    </div>
  );
};

export default Home;
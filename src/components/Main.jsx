import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Nav } from './Index.jsx';
import './Main.css';

const Main = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route 
        path='/'
        element={<Home />}
        />
      </Routes>
    </>
  );
};

export default Main;

// src/components/Movies.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from './Home';

const Movies = () => {
  return (
    <div className="container mx-auto ">
       
      <Outlet />
    </div>
  );
};

export default Movies;

// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCameraMovie } from "react-icons/bi";


const NavBar = () => {
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} >
        <div className="text-black text-2xl font-semibold w-90 flex  ">
           <BiCameraMovie  /> 
           <h1>Movie App</h1>
        </div>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-800 hover:text-black">Home</Link>
          <Link to="/movies" className="text-gray-800 hover:text-black">Movies</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import store from './store';
import './App.css';
import NavBar from './Component/NavBar';
import Movie from './Component/Movie';
import Home from './Component/Home';
import ShowDetails from './Component/ShowDetails';


function App() {
  return (
    <Provider store={store}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<ShowDetails/>}/>
        <Route path="/movies" element={<Movie/>} />
      </Routes>
    </Provider>
  );
}

export default App;

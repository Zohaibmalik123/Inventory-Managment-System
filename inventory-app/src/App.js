import React, { Fragment } from 'react';
import './bootstrap.min.css';
import './App.css';
import Login from './Login/login';
import NavBar from './Navbar/Navbar';

function App() {
  return (
    <Fragment >
        <NavBar />
      <Login />
    
    </Fragment >
  )
}


export default App;

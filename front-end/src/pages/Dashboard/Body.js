import React from 'react';
import './Body.css';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <div className="background">
      <div className="content">
        <h1 className='welcome'>Welcome to Our Library</h1>
        <div className="button-container">
          <button className="login-button"><Link className='button' to={"/Login"}>Login</Link></button>
          <button className="register-button"><Link className='button' to={"/Register"}>Register</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Body;

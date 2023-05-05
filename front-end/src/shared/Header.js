import React from 'react';
import '../style/Header.css';
import logo from '../images/Logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="buttons">
        <button className="buttons2"><Link to={"/"} className='buttons2'>Home</Link></button>
        <button className="buttons2"><Link to={"/About"} className='buttons2'>About Us</Link></button>
        <button className="buttons2"><Link to={"/Contact"} className='buttons2'>Contact</Link></button>
      </div>
    </div>
  );
}



export default Header;

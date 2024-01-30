import React from 'react';
import './LoginPage.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import flagImage from '../../images/flag.png'; // Adjusted import path

const LoginPage = () => {
  return (
    <div className='wrapper'>
      <img src={flagImage} alt="Flag" className="flag-image" /> {/* Using the flag.png image */}
      <form action="">
        <h1>Login</h1>
        <div className='input-box'>
          <input type="text" placeholder='Username' required/>
          <FaUser className='icon'/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' required/> 
          <FaLock className='icon'/>
        </div>
        <div className='forgot-password'> 
          <a href="#">Forgot Password ?</a>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

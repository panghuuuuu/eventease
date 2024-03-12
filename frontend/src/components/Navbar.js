import React from 'react';
import "../stylesheets/navbar.css";
import logo from "../assets/logo_header.png";

function Navbar() {
  return (
    <nav className='navbar_container'>
        <div className='nav_left'>
            <img className='eventease_logo' src={logo} alt='EventEase logo' />
        </div>
        <div className='searchbar'>
            <svg width="14" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41699 13.8745C8.81445 13.8745 10.124 13.4526 11.2139 12.7319L15.0635 16.5903C15.3184 16.8364 15.6436 16.9595 15.9951 16.9595C16.7246 16.9595 17.2607 16.3882 17.2607 15.6675C17.2607 15.3335 17.1465 15.0083 16.9004 14.7622L13.0771 10.9214C13.8682 9.79639 14.334 8.43408 14.334 6.95752C14.334 3.15186 11.2227 0.0405273 7.41699 0.0405273C3.62012 0.0405273 0.5 3.15186 0.5 6.95752C0.5 10.7632 3.61133 13.8745 7.41699 13.8745ZM7.41699 12.0288C4.63086 12.0288 2.3457 9.74365 2.3457 6.95752C2.3457 4.17139 4.63086 1.88623 7.41699 1.88623C10.2031 1.88623 12.4883 4.17139 12.4883 6.95752C12.4883 9.74365 10.2031 12.0288 7.41699 12.0288Z" fill="#474747"/>
            </svg>
            <input type="text" name="search"></input>
        </div>
        <div className='nav_right'>
            <button className='browse'><a href="#">Browse</a></button>
            <button className='login'><a href="#">Log In</a></button>
            <button className='register'><a href="#">Register</a></button>
        </div>
    </nav>
  );
}

export default Navbar;
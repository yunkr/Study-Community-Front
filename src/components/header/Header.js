import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {

  return (
    <div className="header-wrapper">
      <div className="header-title">
        
        <Link to="/">Study-Community</Link>
        
      </div>

      <div className="header-menu">
        <Link to="/Post">Post</Link>
        <Link to="/Study">Study</Link>
        <Link to="/MyPage">MyPage</Link>
      </div>
    </div>
  );
};

export default Header;
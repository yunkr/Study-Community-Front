import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // 먼저 토큰을 제거합니다.

    axios
      .delete("/auth/signout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        window.location.reload(); // 요청이 성공해도 페이지를 새로고침합니다.
      })
      .catch((err) => {
        window.location.reload(); // 요청이 실패해도 페이지를 새로고침합니다.
        console.log("Error occurred during logout:", err);
      });
  };

  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">Study-Community</Link>
      </div>

      <div className="header-menu">
        <Link to="/Post">Post</Link>
        <Link to="/Study">Study</Link>
        {isLoggedIn ? (
          <div style={{ display: 'flex' }}>
            <div className="MenuItem">
              <Link to="/MyPage" className="MenuLink">
                My Page
              </Link>
            </div>
            <div onClick={handleLogout} className="MenuItem">
              <Link to="/" className="MenuLink">
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
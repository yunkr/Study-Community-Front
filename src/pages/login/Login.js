import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      console.log(response.data); // 로그인 성공 시 응답 데이터

      // 엑세스 토큰 저장
      const authHeader = response.headers.authorization;
      const accessToken = authHeader.split(" ")[1];
      localStorage.setItem("token", accessToken);

      // Axios의 기본 헤더에 토큰 추가
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

      // 로그인 성공 후 메인 페이지로 이동
      navigate('/');

      // 요청이 성공하면 페이지를 새로고침
      window.location.reload();

    } catch (error) {
      console.error('로그인 에러:', error.response.data); // 로그인 실패 시 에러 메시지
      setErrorMessage('로그인에 실패했습니다.');
      alert('가입되지 않은 정보입니다. 다시 입력해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
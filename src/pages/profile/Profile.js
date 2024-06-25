import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // 헤더에 토큰 추가
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // 실제 memberId 값을 가져와서 URL을 구성합니다.
        const memberId = 1; // 여기에 실제 memberId 값을 설정해야 합니다.
        const response = await axios.get(`http://localhost:8080/members/${memberId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('프로필 데이터를 불러오는 중 에러:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>프로필을 표시할 수 없습니다. 로그인이 필요합니다.</div>;
  }

  return (
    <div className="profile-container">
      <h1>프로필</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label>이름:</label>
          <span>{userData.nickname}</span>
        </div>
        <div className="profile-item">
          <label>이메일:</label>
          <span>{userData.email}</span>
        </div>
        {/* 필요한 다른 프로필 정보들을 추가하세요 */}
      </div>
    </div>
  );
};

export default Profile;
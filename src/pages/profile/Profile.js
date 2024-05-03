import React from 'react';
import './Profile.css';

const Profile = () => {
  // 가상의 프로필 데이터
  const profileData = {
    name: 'John Doe',
    nickname: 'johndoe123',
    email: 'johndoe@example.com',
    // 필요한 다른 프로필 정보들을 추가하세요
  };

  return (
    <div className="profile-container">
      <h1>프로필</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label>이름:</label>
          <span>{profileData.name}</span>
        </div>
        <div className="profile-item">
          <label>닉네임:</label>
          <span>{profileData.nickname}</span>
        </div>
        <div className="profile-item">
          <label>이메일:</label>
          <span>{profileData.email}</span>
        </div>
        {/* 필요한 다른 프로필 정보들을 추가하세요 */}
      </div>
    </div>
  );
};

export default Profile;
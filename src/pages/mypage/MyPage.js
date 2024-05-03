import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Note'); // 선택된 카테고리 상태

  // 가정한 카테고리와 데이터
  const categories = ['Note', '게시글', '스터디']; // 카테고리 리스트
  const categoryData = {
    'Note': ['데이터 1-1', '데이터 1-2', '데이터 1-3'], // 카테고리 1의 데이터 리스트
    '게시글': ['데이터 2-1', '데이터 2-2', '데이터 2-3'], // 카테고리 2의 데이터 리스트
    '스터디': ['데이터 3-1', '데이터 3-2', '데이터 3-3'], // 카테고리 3의 데이터 리스트
  };

  // 카테고리를 선택할 때 호출되는 함수
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 해당하는 데이터를 가져오는 함수
  const getCategoryData = () => {
    if (selectedCategory) {
      return categoryData[selectedCategory];
    }
    return [];
  };

  return (
    <div className="mypage-container">
      <div className="mypage-sidebar">
        <h2>내 닉네임</h2>
        <Link to="/Profile">프로필 수정</Link>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="mypage-content">
        {getCategoryData().map(data => (
          <div key={data} className="category-box">
            <h3>{data}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
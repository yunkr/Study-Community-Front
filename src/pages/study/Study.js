import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios import
import './Study.css'; // CSS 파일 import

const Study = () => {
  const [studies, setStudies] = useState([]); // 게시물 데이터를 담을 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 기능
  const [searchResultMessage, setSearchResultMessage] = useState(''); // 검색 결과 메시지

  // 검색 기능이 추가된 fetchPosts 함수
  const fetchStudies = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data.data;
      setStudies(data);
      setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 변경

      // 검색 결과가 없는 경우 메시지 설정
      if (data.length === 0) {
        setSearchResultMessage('검색어와 관련된 게시물이 없습니다.');
      } else {
        setSearchResultMessage(''); // 검색 결과가 있을 경우 메시지 초기화
      }
    } catch (error) {
      console.error('Error fetching studies:', error);
    }
  };

  // 전체 게시물을 가져오는 함수
  const fetchAllStudies = async () => {
    const url = 'http://localhost:8080/studies?page=1&size=5';
    await fetchStudies(url);
  };

  // 검색된 게시물을 가져오는 함수
  const searchStudies = async () => {
    const url = `http://localhost:8080/studies/search?page&size&sort=descending&searchKeyword=${searchKeyword}`;
    await fetchStudies(url);
  };

  // 컴포넌트가 마운트될 때 전체 게시물 가져오기
  useEffect(() => {
    fetchAllStudies();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 처음 마운트될 때만 실행됨

  const handleSearch = async () => {
    setLoading(true); // 검색 시 로딩 상태 활성화
    await searchStudies(); // 검색어에 따라 포스트 데이터 가져오기
  };

  // 게시물 목록을 렌더링하는 함수
  const renderStudies = () => {
    return studies.map(study => (
      <div key={study.studyId} className="study-item">
        <Link to={`/Study/${study.studyId}`}>
          <div>
            <h3>{study.title}</h3>
            <p>{study.topic}</p>
          </div> 
          <div className="study-details">
            <div className="study-details-tag">
              <span>태그: {study.tags.join(', ')}</span>
            </div>
            <div className="study-details-view-likes">
              <span>조회수: {study.viewCount}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="study-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="검색어를 입력하세요" 
          value={searchKeyword} 
          onChange={(e) => setSearchKeyword(e.target.value)} 
        />
        <button onClick={handleSearch}>검색</button>
        <Link to="/CreateStudy" className="create-study-button">스터디 등록</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {searchResultMessage && (
            <div className="search-result-message">
              {searchResultMessage}
            </div>
          )}
          <div className="study-list">
            {renderStudies()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Study;
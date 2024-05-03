import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios import
import './Post.css'; // CSS 파일 import

const Post = () => {
  const [posts, setPosts] = useState([]); // 게시물 데이터를 담을 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 기능
  const [searchResultMessage, setSearchResultMessage] = useState(''); // 검색 결과 메시지

  // 검색 기능이 추가된 fetchPosts 함수
  const fetchPosts = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data.data;
      setPosts(data);
      setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 변경

      // 검색 결과가 없는 경우 메시지 설정
      if (data.length === 0) {
        setSearchResultMessage('검색어와 관련된 게시물이 없습니다.');
      } else {
        setSearchResultMessage(''); // 검색 결과가 있을 경우 메시지 초기화
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // 전체 게시물을 가져오는 함수
  const fetchAllPosts = async () => {
    const url = 'http://localhost:8080/posts?page=1&size=5';
    await fetchPosts(url);
  };

  // 검색된 게시물을 가져오는 함수
  const searchPosts = async () => {
    const url = `http://localhost:8080/posts/search?page&size&sort=descending&searchKeyword=${searchKeyword}`;
    await fetchPosts(url);
  };

  // 컴포넌트가 마운트될 때 전체 게시물 가져오기
  useEffect(() => {
    fetchAllPosts();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 처음 마운트될 때만 실행됨

  const handleSearch = async () => {
    setLoading(true); // 검색 시 로딩 상태 활성화
    await searchPosts(); // 검색어에 따라 포스트 데이터 가져오기
  };

  // 게시물 목록을 렌더링하는 함수
  const renderPosts = () => {
    return posts.map(post => (
      <div key={post.postId} className="post-item">
        <Link to={`/Post/${post.postId}`}>
          <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div> 
          <div className="post-details">
            <div className="post-details-tag">
              <span>태그: {post.tags.join(', ')}</span>
            </div>
            <div className="post-details-view-likes">
              <span>조회수: {post.viewCount}</span>
              <span>좋아요: {post.likes}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="post-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="검색어를 입력하세요" 
          value={searchKeyword} 
          onChange={(e) => setSearchKeyword(e.target.value)} 
        />
        <button onClick={handleSearch}>검색</button>
        <Link to="/CreatePost" className="create-post-button">게시물 등록</Link>
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
          <div className="post-list">
            {renderPosts()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Post.css';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResultMessage, setSearchResultMessage] = useState('');

  const fetchPosts = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data.data;
      setPosts(data);
      setLoading(false);

      if (data.length === 0) {
        setSearchResultMessage('검색어와 관련된 게시물이 없습니다.');
      } else {
        setSearchResultMessage('');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchAllPosts = useCallback(async () => {
    const url = 'http://localhost:8080/posts?page=1&size=5';
    await fetchPosts(url);
  }, []);

  const searchPosts = async () => {
    const url = `http://localhost:8080/posts/search?page&size&sort=descending&searchKeyword=${searchKeyword}`;
    await fetchPosts(url);
  };

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const handleSearch = async () => {
    setLoading(true);
    await searchPosts();
  };

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
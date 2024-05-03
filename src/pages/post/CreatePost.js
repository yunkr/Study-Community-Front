import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './CreatePost.css'; // 필요한 CSS 파일을 import

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/posts', {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
      });
      // 게시물 등록 후 Post 페이지로 이동
      navigate('/Post');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">태그 (쉼표로 구분)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit" className="create-post-submit">등록하기</button>
      </form>
    </div>
  );
};

export default CreatePost;
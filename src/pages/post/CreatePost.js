import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // 필요한 CSS 파일을 import

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set으로 변환
    const tagsSet = new Set(tags.split(',').map(tag => tag.trim()));

    const postData = {
      memberId: 1, // 고정된 memberId 값
      title,
      content,
      tags: Array.from(tagsSet), // Set을 Array로 변환하여 전송
      postStatus: 'POST_REGISTRATION', // 기본값 설정
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString()
    };

    console.log('Sending post data:', postData); // 요청 데이터 로그 출력

    try {
      const response = await axios.post('http://localhost:8080/posts', postData);
      console.log('Post added successfully:', response.data);
      // 게시물 등록 후 Post 페이지로 이동
      navigate('/Post');
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했으나, 2xx 범위가 아님
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌으나 응답을 받지 못함
        console.error('Error request:', error.request);
      } else {
        // 오류를 발생시킨 요청 설정
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
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
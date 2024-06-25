import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './CreateStudy.css'; // 필요한 CSS 파일을 import

const CreateStudy = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [schedule, setSchedule] = useState(''); // 일정 추가
  const [curriculum, setCurriculum] = useState(''); // 커리큘럼 추가
  const [personnel, setPersonnel] = useState(''); // 인원 추가
  const [introduction, setIntroduction] = useState(''); // 소개 추가
  const [precautions, setPrecautions] = useState(''); // 주의사항 추가
  const [apply, setApply] = useState(''); // 지원방법 추가
  const [studyCategoryId, setStudyCategoryId] = useState('');
  const [studyCategories, setStudyCategories] = useState([]); // 스터디 카테고리 목록 추가
  const [tags, setTags] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기

  useEffect(() => {
    // 스터디 카테고리 목록을 가져오는 함수
    const fetchStudyCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/studyCategories');
        setStudyCategories(response.data);
      } catch (error) {
        console.error('Error fetching study categories:', error);
      }
    };

    fetchStudyCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set으로 변환
    const tagsSet = new Set(tags.split(',').map(tag => tag.trim()));

    const studyData = {
      memberId: 1, // 고정된 memberId 값
      title,
      topic,
      schedule, // 일정 추가
      curriculum, // 커리큘럼 추가
      personnel, // 인원 추가
      introduction, // 소개 추가
      precautions, // 주의사항 추가
      apply, // 지원방법 추가
      studyCategoryId,
      tags: Array.from(tagsSet), // Set을 Array로 변환하여 전송
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString()
    };

    console.log('Sending study data:', studyData); // 요청 데이터 로그 출력

    try {
      const response = await axios.post('http://localhost:8080/studies', studyData);
      console.log('Study added successfully:', response.data);
      // 스터디 등록 후 Study 페이지로 이동
      navigate('/Study');
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
    <div className="create-study-container">
      <h2>스터디 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studyCategory">스터디 카테고리 선택</label>
          <select
            id="studyCategory"
            value={studyCategoryId}
            onChange={(e) => setStudyCategoryId(e.target.value)}
            required
          >
            <option value="">카테고리를 선택하세요</option>
            {studyCategories.map(category => (
              <option key={category.studyCategoryId} value={category.studyCategoryId}>{category.studyCategoryName}</option>
            ))}
          </select>
        </div>
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
          <label htmlFor="topic">주제</label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="schedule">일정</label>
          <input
            type="text"
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curriculum">커리큘럼</label>
          <textarea
            id="curriculum"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="personnel">인원</label>
          <input
            type="text"
            id="personnel"
            value={personnel}
            onChange={(e) => setPersonnel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="introduction">소개</label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precautions">주의사항</label>
          <textarea
            id="precautions"
            value={precautions}
            onChange={(e) => setPrecautions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apply">지원방법</label>
          <textarea
            id="apply"
            value={apply}
            onChange={(e) => setApply(e.target.value)}
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
        <button type="submit" className="create-study-submit">등록하기</button>
      </form>
    </div>
  );
};

export default CreateStudy;
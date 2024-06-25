import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StudyDetail.css';

const StudyDetail = () => {
    const { studyId } = useParams(); // URL에서 studyId 가져오기
    const [study, setStudy] = useState(null); // 스터디 상태 관리
    const [comments, setComments] = useState([]); // 댓글 목록 상태 관리
    const [comment, setComment] = useState(''); // 새로운 댓글 내용 상태 관리

    useEffect(() => {
        const fetchStudyAndComments = async () => {
            try {
                // 스터디 데이터 가져오기
                const studyResponse = await axios.get(`http://localhost:8080/studies/${studyId}`);
                setStudy(studyResponse.data.data);

                // 스터디의 댓글 데이터 가져오기
                const commentsResponse = await axios.get(`http://localhost:8080/studyComments/study/${studyId}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('스터디 및 댓글 가져오기 오류:', error);
                setComments([]); // 댓글이 없는 경우 빈 배열로 설정
            }
        };

        fetchStudyAndComments(); // useEffect 내에서 직접 호출하는 함수
    }, [studyId]);

    // 새로운 댓글 작성 핸들러
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        try {
            // 댓글 추가 요청
            await axios.post(`http://localhost:8080/studyComments`, { studyId: studyId, content: comment });

            // 새로운 댓글 목록에 추가
            const newComment = { content: comment }; // 새로운 댓글 객체 생성
            setComments(prevComments => [...prevComments, newComment]); // 새로운 댓글 목록에 추가
            setComment(''); // 입력창 초기화
        } catch (error) {
            console.error('댓글 작성 오류:', error);
        }
    };

    // 스터디 데이터가 없는 경우 메시지 출력
    if (!study) {
        return <div>스터디를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="study-detail-container">
            <div className="study-detail-item">
                <h2 className="study-detail-title">{study.title}</h2>
                <div className="study-details-category">
                    <span>스터디 카테고리: {study.studyCategoryName}</span>
                </div>
                <div className="study-details">
                    <div className="study-details-view-likes">
                        <span>조회수: {study.viewCount}</span>
                    </div>
                </div>
                {/* 스터디 상세 정보 */}
                <p className="study-detail-content">주제: {study.topic}</p>
                <p className="study-detail-content">일정: {study.schedule}</p>
                <p className="study-detail-content">커리큘럼: {study.curriculum}</p>
                <p className="study-detail-content">인원: {study.personnel}</p>
                <p className="study-detail-content">소개: {study.introduction}</p>
                <p className="study-detail-content">주의사항: {study.precautions}</p>
                <p className="study-detail-content">지원방법: {study.apply}</p>
                <div className="study-details-tag">
                    <span>태그: {study.tags.join(', ')}</span>
                </div>
            </div>

            {/* 댓글 작성 섹션 */}
            <div className="comment-section">
                <h3>댓글 작성</h3>
                <form className="comment-form" onSubmit={handleSubmitComment}>
                    <textarea
                        placeholder="댓글을 작성하세요"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit">댓글 작성</button>
                </form>
            </div>

            {/* 댓글 목록 섹션 */}
            <div className="comment-section">
                <h3>댓글 목록</h3>
                <ul className="comment-list">
                    {comments && comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li key={index} className="comment-item">{comment.content}</li>
                        ))
                    ) : (
                        <li className="comment-item">댓글이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StudyDetail;
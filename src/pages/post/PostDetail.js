import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // 특정 게시물 데이터 가져오기
                const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
                setPost(postResponse.data.data);
    
                // 특정 게시물의 댓글 데이터 가져오기
                const commentsResponse = await axios.get(`http://localhost:8080/postComments/post/${postId}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching post and comments:', error);
                setComments([]); // 댓글이 없는 경우 빈 배열로 설정
            }
        };
    
        fetchPostAndComments(); // useEffect 내에서 직접 호출하는 함수
    }, [postId]);


    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;
    
        try {
            // 댓글 추가
            await axios.post(`http://localhost:8080/postComments`, { postId: postId, content: comment });
            // 새로운 댓글 목록에 추가
            const newComment = { content: comment }; // 새로운 댓글 생성
            setComments(prevComments => [...prevComments, newComment]); // 새로운 댓글 목록에 추가
            setComment(''); // 입력창 초기화
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail-item">
                <h2 className="post-detail-title">{post.title}</h2>
                <div className="post-details">
                    <div className="post-details-view-likes">
                        <span>조회수: {post.viewCount}</span>
                        <span>좋아요: {post.likes}</span>
                    </div>
                    <button className="like-button">좋아요</button>
                </div>
                <div className="post-details-tag">
                    <span>태그: {post.tags.join(', ')}</span>
                </div>
                <p className="post-detail-content">{post.content}</p>
            </div>

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

export default PostDetail;
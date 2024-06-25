import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likesCount, setLikesCount] = useState(0); // 좋아요 수 상태 추가
    const [liked, setLiked] = useState(false); // 좋아요 여부 상태 추가

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // 게시물 데이터 가져오기
                const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
                setPost(postResponse.data.data);

                // 댓글 데이터 가져오기
                const commentsResponse = await axios.get(`http://localhost:8080/postComments/post/${postId}`);
                setComments(commentsResponse.data);

                // 좋아요 수 가져오기
                const likesCountResponse = await axios.get(`http://localhost:8080/likes/${postId}/count`);
                setLikesCount(likesCountResponse.data);
                
                // 현재 사용자의 좋아요 상태 가져오기
                const userLikeResponse = await axios.get(`http://localhost:8080/likes/${postId}/user-like`);
                setLiked(userLikeResponse.data); 
            } catch (error) {
                console.error('게시물 및 댓글 가져오기 오류:', error);
                setComments([]);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8080/likes/${postId}/${postId}/toggle`);
            if (liked) {
                setLikesCount(prevCount => prevCount - 1);
            } else {
                setLikesCount(prevCount => prevCount + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error('게시물 좋아요 오류:', error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        try {
            // 댓글 추가
            await axios.post(`http://localhost:8080/postComments`, { postId: postId, content: comment });
            // 댓글 추가 후 다시 댓글 목록 가져오기
            const updatedCommentsResponse = await axios.get(`http://localhost:8080/postComments/post/${postId}`);
            setComments(updatedCommentsResponse.data);
            setComment('');
        } catch (error) {
            console.error('댓글 작성 오류:', error);
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
                        <span>좋아요: {likesCount}</span>
                    </div>
                    <button className="like-button" onClick={handleLike}>
                        {liked ? '좋아요 취소' : '좋아요'}
                    </button>
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
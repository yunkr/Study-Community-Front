import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main'; // Main 컴포넌트를 import 합니다.
import Header from './components/header/Header'; // 다른 컴포넌트도 필요하다면 import 해주세요.
import Post from './pages/post/Post';
import PostDetail from './pages/post/PostDetail';
import CreatePost from './pages/post/CreatePost';
import Study from './pages/study/Study';
import StudyDetail from './pages/study/StudyDetail';
import CreateStudy from './pages/study/CreateStudy';
import Profile from './pages/profile/Profile';
import MyPage from './pages/mypage/MyPage';

const App = () => {

  return (
    <Router>
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Post/:postId" element={<PostDetail />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Study" element={<Study />} />
          <Route path="/Study/:studyId" element={<StudyDetail />} />
          <Route path="/CreateStudy" element={<CreateStudy />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MyPage" element={<MyPage />} />

        </Routes>
      </React.Fragment>
    </Router>
  );
};

export default App;
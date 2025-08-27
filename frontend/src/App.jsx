import "aos/dist/aos.css"; 
import './App.css'
import React, { useEffect } from "react";
import {Routes,Route} from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import SubLayout from './layouts/SubLayout.jsx'; // 서브배너일단넣어둬 
import Homepage from './pages/Home/Homepage.jsx';

import SignIn from './pages/Login/SignIn.jsx';
import SignUp from './pages/Login/SignUp.jsx';

import BookDetail from './pages/Book/BookDetail.jsx';

import Board from './pages/Board/Board.jsx';
import BoardDetail from './pages/Board/BoardDetail.jsx';
import BoardWrite from './pages/Board/BoardWrite.jsx';
import BoardUpdate from './pages/Board/BoardUpdate.jsx';

import Mypage from './pages/Mypage/Mypage.jsx';

import NotFound from './pages/NotFound/NotFound.jsx';

import AOS from "aos";
import SessionBootstrap from "./components/SessionBootstrap.jsx";


import BookRecom from "./pages/Book/BookRecom.jsx";
import BookEdit from "./pages/Book/BookEdit.jsx";
import BookView from "./pages/Book/BookView.jsx";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <div>
      <SessionBootstrap />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />}/>
          {/* 책 관련 라우트 */}
          {/* <Route path="books">
            <Route path="id:" element={<BookDetail />} />
          </Route> */}
        
          {/* 게시판 관련 라우트 */}
          {/* <Route
          element={
            <SubLayout
              banner={{
                title: "게시판",
                subtitle: "독서 소식을 공유하고 대화해 보세요",
                bgImage: "/images/banner-board.jpg",
              }}
            />
          }
        > */}
          <Route path="board">
            <Route index element={<Board />} />
            <Route path=":id" element={<BoardDetail />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path=":id/update" element={<BoardUpdate />} />
          </Route>
          <Route path="recommand">
            <Route index element={<BookRecom />} />
            <Route path="edit" element={<BookEdit />} />
            <Route path="view" element={<BookView />} />
          </Route>
          
        </Route>
          {/* 마이페이지 관련 라우트 */}
          <Route path="mypage" element={<Mypage />} />
        {/* </Route> */}
         {/* 로그인 관련 라우트 */}
          <Route path="login">
            <Route index element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

        <Route path='*' element={<NotFound />} />   
      </Routes>
     </div> 
  )
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mypage from './pages/Mypage';
import ModifyPwd from './pages/ModifiyPwd';
import ModifyProfilePhoto from './pages/ModifyProfilePhoto';
import IssueWrite from './pages/IssueWrite';
import IssueList from './pages/IssueList';
import IssueRead from './pages/IssueRead';
import IssueModify from './pages/IssueModify';
import DevelopingPage from './pages/DevelopingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/mypage/modifyPwd' element={<ModifyPwd/>}/>
        <Route path='/mypage/modifyProfilePhoto' element={<ModifyProfilePhoto/>}/>
        {/* IssueWrite 페이지와 연결되는 link 추가 (매개변수 : pjNo) */}
        <Route path="/issueWrite/:pjNo" element={<IssueWrite />} />
        {/* IssueList 페이지와 연결되는 link 추가 (매개변수 : pjNo) */}
        <Route path="/issueList/:pjNo" element={<IssueList />} />
        {/* IssueRead 페이지와 연결되는 link 추가 (매개변수 : issueNo) */}
        <Route path="/issueRead/:issueNo" element={<IssueRead />} />
        {/* IssueRead 페이지와 연결되는 link 추가 (매개변수 : issueNo) */}
        <Route path="/issueModify/:issueNo" element={<IssueModify />} />
        {/* DevelopingPage 페이지와 연결되는 link 추가 */}
        <Route path="/developing" element={<DevelopingPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
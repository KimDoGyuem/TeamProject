import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../App.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="Company Logo" />
            </Link>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>기능 소개</h3>
              <Link to="/about">인바운드</Link>
              <Link to="/features">고객 관리</Link>
              <Link to="/pricing">아웃바운드</Link>
            </div>
            
            <div className="footer-column">
              <h3>인사이트</h3>
              <Link to="/blog">블로그</Link>
              <Link to="/news">뉴스레터</Link>
              <Link to="/webinar">무료 세미나</Link>
            </div>
            
            <div className="footer-column">
              <h3>고객지원</h3>
              <Link to="/guide">업데이트 소식</Link>
              <Link to="/docs">서비스 소개서</Link>
              <Link to="/help">도움말</Link>
            </div>
            
            <div className="footer-column">
              <h3>전문가 서비스</h3>
              <Link to="/partner">파트너 정보</Link>
              <Link to="/consulting">전문가 상담</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="company-info">
            <p>비즈니스캠퍼스 대표: 홍길동 서울특별시 강남구 봉은사로 125 리스트빌딩 B2</p>
            <p>070-4012-0700 사업자등록번호: 714-86-01927 통신판매번호: 2024-서울강남-00789호</p>
          </div>
          <div className="language-select">
            <Link to="/terms">서비스 이용약관</Link>
            <Link to="/privacy">개인정보 처리방침</Link>
            <select>
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
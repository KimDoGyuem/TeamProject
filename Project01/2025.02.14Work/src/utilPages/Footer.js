import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/logo_White.png';
import '../App.css';

/*아이콘 사용시 다운 필요 */
// npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          {/* 로고 + 회사 정보 */}
          <div className="footer-left">
            <div className="footer-logo">
              <Link to="/">
                <img src={logo} alt="Company Logo" />
              </Link>
            </div>
            <div className="company-info">
              <p>
                회사명: 넥사단 <br />
                서울특별시 강남구 봉은사로 119 성옥빌딩 F5 <br />
                사업자등록번호: 714-86-01927 <br />
                설립일자: 2024.&nbsp;12.&nbsp;24 <br />
                대표전화: 070-4012-0700
              </p>
            </div>
          </div>
        {/* </div> */}
        
        <div className="footer-bottom">
          
          {/* 소셜 미디어 아이콘 */}
          <div className="social-links">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
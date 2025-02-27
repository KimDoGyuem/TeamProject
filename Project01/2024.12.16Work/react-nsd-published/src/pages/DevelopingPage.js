import React from 'react';
import content_ready_img from '../images/content_ready_img.png';
import Header from '../utilPages/Header';
import Footer from '../utilPages/Footer';
import './Pages.css';

const DevelopingPage = () => {
    return (
        <div id='company_site'>
            <Header />
            
            <div className="developing-container">
                <div className="developing-content">
                    <img 
                        src={content_ready_img} 
                        alt="개발 진행중" 
                        className="developing-image"
                    />
                    <h2 className="developing-title">개발 진행중입니다</h2>
                    <p className="developing-text">
                        현재 페이지는 개발 중에 있습니다. <br />
                        빠른 시일 내에 서비스하도록 하겠습니다.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DevelopingPage;
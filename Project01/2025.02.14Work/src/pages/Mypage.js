import { useEffect, useState } from 'react';
import './Pages.css';
import '../App.css';
import '../App.js';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import photo1 from '../utilPages/photo1.png'
import photo2 from '../utilPages/photo2.png'
import photo3 from '../utilPages/photo3.png'
import photo4 from '../utilPages/photo4.png'
import photo5 from '../utilPages/photo5.png'
import photo6 from '../utilPages/photo6.png'
import photo7 from '../utilPages/photo7.png'
import photo8 from '../utilPages/photo8.png'
import Header from '../utilPages/Header';
import Footer from '../utilPages/Footer';


function Mypage() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
    const [loginPosition, setLoginPosition] = useState('');
    const [ profilePhoto, setProfilePhoto ] = useState(null);

    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        handleLogin();
    }, []);

    function handleLogin() {
        axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
        .then(response => {
            const loginInfo = response.data;
            setLoginId(loginInfo.company_id);
            setloginName(loginInfo.company_name);
            setLoginRank(loginInfo.position_rank);
            setLoginPosition(loginInfo.position);
            setProfilePhoto(loginInfo.profile_photo);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    function logout() {
        axios.get('http://localhost:8080/spring/company/logout', { withCredentials: true })
        .then(() => {
            handleLogin();
            navigate('/'); // 메인 페이지로 이동
        })
        .catch(error => {
            console.error('에러2!', error);
        })
    }

    const getProfilePhoto = (photo) => {
        const photoMapping = {
            "1": photo1,
            "2": photo2,
            "3": photo3,
            "4": photo4,
            "5": photo5,
            "6": photo6,
            "7": photo7,
            "8": photo8
        };
        return photoMapping[photo] || photo1; // 기본값으로 photo1 사용
    };

    const profilePhotoURL = getProfilePhoto(profilePhoto);

    return (
        <div id='company_site'>
        <Header loginName={loginName} loginPosition={loginPosition} />
        <div id='mypage_main_box'>
            <div id='mypage_info'>
                <div className="profile-container">
                <h1>내 정보</h1>
                    <div className="profile-photo">
                        <img src={profilePhotoURL} alt="프로필 사진" className="profile-img" />
                    </div>
                    
                    <div className="profile-details">
                        <div className="info-row">아이디 : {loginId}</div>
                        <div className="info-row">이름 : {loginName}</div>
                        <div className="info-row">직책 : {loginPosition}</div>
                        
                        <div className="button-group">
                            <Link to="modifyProfilePhoto"><button className="profile-btn">프로필 사진 변경</button></Link>
                            <Link to="modifyPwd"><button className="profile-btn">비밀번호 변경</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer /> {/* Footer 추가 */}
        </div>
    )
}

export default Mypage;
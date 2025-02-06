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
import logo from '../images/logo.png'

function Mypage() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
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
            setloginName(loginInfo.name);
            setLoginRank(loginInfo.p_rank);
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
        };
        return photoMapping[photo] || photo1; // 기본값으로 photo1 사용
    };

    const profilePhotoURL = getProfilePhoto(profilePhoto);

    return (
        <div id='company_site'>
        <div id='main_top_box'>
        <div id='company_logo'><Link to='/'><img id='logo' src={logo} alt='company_logo.png'></img></Link></div>
        <div id='login_box'>
        <button className='login_button' onClick={logout}>로그아웃</button>
        아이디 : {loginId} <br />
        이름 : {loginName} <br />
        랭크 : {loginRank}
        </div>
        </div>
        <div id='mypage_main_box'>
            <div id='mypage_info'>
                <h1>내 정보</h1>

                <img src = {profilePhotoURL} /> <br />

                아이디 : {loginId} <br />   
                이름 : {loginName} <br />
                랭크 : {loginRank} <br />
                <Link to="modifyProfilePhoto"><button>프로필 사진 변경</button></Link>
                <Link to="modifyPwd"><button>비밀번호 변경</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Mypage;
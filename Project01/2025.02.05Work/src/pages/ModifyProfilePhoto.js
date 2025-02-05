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
import logo from '../images/logo.png';

function ModifyProfilePhoto() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);

    const [modifyPP, setModifyPP] = useState(null);

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

    function changePP() {
        let body = {company_id : loginId, profile_photo : modifyPP};
        axios.post('http://localhost:8080/spring/company/modifyMyPP', body)
        .then(() => {
            alert("변경되었습니다.");
            navigate('/mypage', {replace:true});
        })
        .catch(error => {
            console.error("에러! : ", error);
        })
    }

    const handleChange = (e) => {
        setModifyPP(e.target.value);
    }

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
        <div id='mypage_main_box>'>
        <fieldset>
                <form onSubmit={(e) => {
                e.preventDefault();
                changePP();
                }}>
                    <input type="radio" id="option1" name="option" value="1" onChange={handleChange} />
                    <label for="option1"><img src = {photo1} /></label>
                    <input type="radio" id="option2" name="option" value="2" onChange={handleChange} />
                    <label for="option2"><img src = {photo2} /></label>
                    <input type="radio" id="option3" name="option" value="3" onChange={handleChange} />
                    <label for="option3"><img src = {photo3} /></label>
                    <input type="radio" id="option4" name="option" value="4" onChange={handleChange} />
                    <label for="option4"><img src = {photo4} /></label>
                    <input type="radio" id="option5" name="option" value="5" onChange={handleChange} />
                    <label for="option5"><img src = {photo5} /></label>
                    <br />
                    <input type="submit" value="변경"></input> 
                </form>
        </fieldset>
        </div>
        </div>
    )
}

export default ModifyProfilePhoto;
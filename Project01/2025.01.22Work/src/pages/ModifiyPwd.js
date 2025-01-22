import { useEffect, useState } from 'react';
import './Pages.css';
import '../App.css';
import '../App.js';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ModifyPwd() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);

    const [modifyPw, setModifyPw] = useState(null);

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


    function changePw() {
        let body = {company_id : loginId, password: modifyPw};
        axios.post('http://localhost:8080/spring/company/modifyMyPw', body)
        .then(() => {
            alert("변경되었습니다.");
            navigate('/mypage');
        })
        .catch(error => {
            console.error("에러! : ", error);
        })
    }

    return (
        <div id='company_site'>
        <div id='main_top_box'>
        <div id='company_logo'><Link to='/'>회사 로고</Link></div>
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
        changePw();
    }}>
                    아이디 : {loginId} <br/>
                    비밀번호 : <input type="password" onChange={(e) => setModifyPw(e.target.value)}></input>
                    <input type="submit" value="비밀번호 변경"></input> 
                </form>
        </fieldset>
        </div>
        </div>
    )
}

export default ModifyPwd;
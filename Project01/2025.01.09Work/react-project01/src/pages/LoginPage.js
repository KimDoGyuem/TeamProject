import './Pages.css';
import { useState } from "react";
import axios from 'axios';

function LoginPage({ onLogin, mainPageRoad }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    function axiosLogin(e) {
        e.preventDefault();
        let body = { company_id: id, password: pw };
        axios.post('http://localhost:8080/spring/company/login', body, { withCredentials: true })
            .then(response => {
                if (response.data === 1) {
                    alert("로그인 했습니다");
                    onLogin();
                    sessionStorage.setItem('page', 'basic'); // 로그인 시 메인 페이지 주소로 세션 저장
                    mainPageRoad(); // 로그인 시 메인 페이지로 이동 
                } else {
                    alert("로그인 실패 했습니다");
                }
            })
            .catch(error => {
                console.error('에러1!', error);
            })
    }

    //BrowserRouter 처리 한거
    function axiosLoginxx() {
        let body = { company_id: id, password: pw };
        axios.post('http://localhost:8080/spring/company/login', body, { withCredentials: true })
            .then(response => {
                if (response.data === 1) {
                    alert("로그인 했습니다");
                    document.location.href = "/";
                    onLogin();
                } else {
                    alert("로그인 실패 했습니다");
                }
            })
            .catch(error => {
                console.error('에러1!', error);
            })
    }

    return (
        <div id='login_page'>
            <fieldset>
                {/* <form onSubmit={axiosLogin}> */}
                <form onSubmit={axiosLoginxx}>
                    <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요" /><br />
                    <input type='password' value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요" /><br />
                    <button type="submit">로그인</button>
                </form>
            </fieldset>
        </div>
    );
}

export default LoginPage;
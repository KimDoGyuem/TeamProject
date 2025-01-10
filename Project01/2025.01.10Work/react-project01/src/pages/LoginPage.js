import './Pages.css';
import { useState } from "react";
import axios from 'axios';
import App from '../App';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    //테스트
    function LoginDisplay() {
        const [id, setId] = useState('');
        const [pw, setPw] = useState('');
        const navigate = useNavigate();
        
        // 입력한 아이디 있는지 확인
        function axiosLogin(e) {
            e.preventDefault();
            let body = { company_id: id, password: pw };
            axios.post('http://localhost:8080/spring/company/login', body, { withCredentials: true })
                .then(response => {
                    if (response.data === 1) {
                        alert("로그인 했습니다");
                        handleLogin();
                    } else {
                        alert("로그인 실패 했습니다");
                    }
                })
                .catch(error => {
                    console.error('에러1!', error);
                })
        }

        // 서버에서 불러온 회원 정보 저장 후 메인 페이지로 이동
        function handleLogin() {
            axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
            .then(response => {
                const loginInfo = response.data;
                sessionStorage.setItem('loginId', loginInfo.company_id);
                sessionStorage.setItem('loginName', loginInfo.name);
                sessionStorage.setItem('loginRank', loginInfo.p_rank);
                navigate("/");
              })
              .catch(error => {
                console.error('에러2!', error);
              })
          }
          
        return (
            <div id='login_page'>
                <fieldset>
                    <form onSubmit={axiosLogin}>
                        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요" /><br />
                        <input type='password' value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요" /><br />
                        <button type="submit">로그인</button>
                    </form>
                </fieldset>
            </div>
        );
    }

    return (

        <>
            <App Display={LoginDisplay}/>
        </>

    );
}

export default LoginPage;
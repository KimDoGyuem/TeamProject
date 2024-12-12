import './App.css';
import { useState } from "react";
import axios from 'axios';

function LoginPage({onLogin}) {
    const[id, setId] = useState('');
    const[pw, setPw] = useState('');

    function axiosLogin(e){
        e.preventDefault();
        let body = {company_id:id , password:pw};
        axios.post('http://localhost:8080/spring/company/login',body)
        .then(response => {
            if(response.data === 1){
                alert("로그인 했습니다");
                    axiosLoginInfo(body);
                    onLogin();
                }else{
                    alert("로그인 실패 했습니다");
                }
            })
            .catch(error => {
                console.error('에러!', error);
            })
        }
    function axiosLoginInfo(body){
        axios.post('http://localhost:8080/spring/company/loginInfo',body)
        .then(response => {
            const loginInfo = response.data;
            sessionStorage.setItem('loginId',loginInfo.company_id);
            sessionStorage.setItem('loginRank',loginInfo.position_rank);
        })   
        .catch(error => {
            console.error('에러!', error);
        }) 
    }
        
    return (
        <div id='login_box'>
            <div>
                <form onSubmit={axiosLogin}>
                    <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="아이디를 입력하세요"/><br/>
                    <input type='password' value={pw} onChange={(e)=>setPw(e.target.value)} placeholder="비밀번호를 입력하세요"/><br/>
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
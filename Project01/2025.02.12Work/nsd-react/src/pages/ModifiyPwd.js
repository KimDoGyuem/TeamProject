import { useEffect, useState } from 'react';
import './Pages.css';
import '../App.css';
import '../App.js';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../utilPages/Header';
import Footer from '../utilPages/Footer';

function ModifyPwd() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
    const [loginPosition, setLoginPosition] = useState('');
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
            setloginName(loginInfo.company_name);
            setLoginRank(loginInfo.position_rank);
            setLoginPosition(loginInfo.position);
        })
        .catch(error => {
            console.error('에러!', error);
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
            <Header loginName={loginName} loginPosition={loginPosition} />
            <div id='modify_pwd_page'>
                <fieldset>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        changePw();
                    }}>
                        <div className="input-group">
                            <label>아이디</label>
                            <input type="text" value={loginId} disabled />
                        </div>
                        <div className="input-group">
                            <label>새 비밀번호</label>
                            <input 
                                type="password" 
                                onChange={(e) => setModifyPw(e.target.value)}
                                placeholder="새 비밀번호를 입력하세요"
                            />
                        </div>
                        <button type="submit">비밀번호 변경</button>
                    </form>
                </fieldset>
            </div>
            <Footer /> {/* Footer 추가 */}
        </div>
    )
}

export default ModifyPwd;
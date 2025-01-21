import { useRef, useState, useEffect } from 'react';
// import './Board.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function IssueWrite() { //loginId 굳이 안넘어와도 될듯? 세션으로 그냥 꺼내면 됨 BoardRead.js 참조
    const [loginName, setloginName] = useState(null);

    const { pjNo } = useParams(); // URL 파라미터에서 projectId 가져오기
    const issue_project_no = parseInt(pjNo, 10); // 숫자 변환

    const navigate = useNavigate(); // useNavigate 훅 초기화

    const name = useRef();
    const title = useRef();
    const details = useRef();
    const [label, setLabel] = useState('bug');
    
    useEffect(() => {
        handleLogin();
    }, []);

    function handleLogin() {
        axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
        .then(response => {
            const loginInfo = response.data;
            setloginName(loginInfo.name);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    function axiosIssueWrite(e) {
        e.preventDefault();
        if(title.current.value === '' || details.current.value === '' || label === ''){
            alert('공백 입력 금지!');
        }else{
            let body = { issue_author: name.current.value, issue_title: title.current.value, issue_details: details.current.value, issue_project_no: issue_project_no, issue_label: label}
            console.log('POST Body:', body); // 요청 전에 데이터 확인
            axios.post('http://localhost:8080/spring/company/issueWrite', body)
                .then(() => {
                    navigate('/');
                })  
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    return (
        <div id='issue_write_page'>
            <div id='write_box'>
                <form id='form_box' onSubmit={axiosIssueWrite}>
                    <input ref={name} type='hidden' value={loginName}></input>
                    <input style={{width: '1000px', height: '50px'}} ref={title} placeholder='Add a title'></input> <br/><br/>
                    label:<select value={label} onChange={(e) => setLabel(e.target.value)}>
                        <option key='0' value='bug'>bug</option>
                        <option key='1' value='documentation'>documentation</option>
                        <option key='2' value='duplicate'>duplicate</option>
                    </select>
                    <textarea style={{width: '1000px', height: '500px'}} ref={details} placeholder='Add a description'></textarea> <br/><br/>
                    <button type='submit'>등록</button> &nbsp;
                    <Link to='/'><button>취소</button></Link>
                </form>
            </div>
        </div>
    );
}

export default IssueWrite;
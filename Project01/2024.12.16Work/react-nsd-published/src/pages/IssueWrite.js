import { useRef, useState, useEffect } from 'react';
import './Issue.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LocalUrl from '../LocalUrl';

function IssueWrite() { 

    const [loginName, setloginName] = useState('');

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
        axios.get(`${LocalUrl()}/company/loginInfo`, { withCredentials: true })
        .then(response => {
            const loginInfo = response.data;
            setloginName(loginInfo.company_name);
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
            axios.post(`${LocalUrl()}/company/issueWrite`, body)
                .then(() => {
                    navigate('/');
                })  
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    return (
        <div className="issue-form-container">
            <h1 className="issue-form-header">Create new issue</h1>
            <div className="issue-form">
                <form onSubmit={axiosIssueWrite}>
                    <input ref={name} type='hidden' value={loginName}></input>
                    <input 
                        className="issue-form-title"
                        ref={title} 
                        placeholder='Add a title'
                    />
                    <select 
                        className="issue-form-label-select"
                        value={label} 
                        onChange={(e) => setLabel(e.target.value)}
                    >
                        <option value='BugFix'>BugFix</option>
                        <option value='Setting'>Setting</option>
                        <option value='Feature'>Feature</option>
                        <option value='Deploy'>Deploy</option>
                        <option value='Html&css'>Html&css</option>
                        <option value='CrossBrowsing'>CrossBrowsing</option>
                        <option value='Docs'>Docs</option>
                        <option value='Api'>Api</option>
                        <option value='Refactor'>Refactor</option>
                        <option value='Question'>Question</option>
                        <option value='Accessibility'>Accessibility</option>
                        <option value='Test'>Test</option>
                    </select>
                    <textarea 
                        className="issue-form-description"
                        ref={details} 
                        placeholder='Add a description'
                    />
                    <div className="issue-form-buttons">
                        <button className="issue-form-submit" type='submit'>Submit new issue</button>
                        <Link to={`/issueList/${issue_project_no}`}><button className="issue-form-cancel">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IssueWrite;
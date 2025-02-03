import { useRef, useState, useEffect } from 'react';
import './Issue.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function IssueModify() {
    const [issue, setIssue] = useState({ 
        issue_title: "",
        issue_details: "",
        issue_label: ""});
    const { issueNo } = useParams(); // URL 파라미터에서 projectId 가져오기
    const issue_no = parseInt(issueNo, 10); // 숫자 변환
    const navigate = useNavigate(); // useNavigate 훅 초기화

    useEffect(() => {
        axiosGetIssueByIssueNo();
    }, []);

    function axiosGetIssueByIssueNo() {
        axios.get(`http://localhost:8080/spring/company/getIssueByIssueNo?issueNo=${issue_no}`)
            .then((response) => {
                setIssue(response.data); 
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosIssueModify(e) {
        e.preventDefault();
        
        let body = { issue_title: issue.issue_title, issue_details: issue.issue_details, issue_label: issue.issue_label, issue_no: issue_no}
        axios.post('http://localhost:8080/spring/company/issueModify', body)
            .then(() => {
                navigate(-1);
            })  
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function handleChange(e){
        const { name, value } = e.target; // input의 name과 value 가져오기
        setIssue(prevIssue => ({          
            ...prevIssue, //이전 Issue 객체 복사
             [name]: value // 계산된 속성 이름(Computed Property Name) 문법, ex) issue_title: 입력 값
        }));
    }

    return (
        <div className="issue-form-container">
            <h1 className="issue-form-header">Edit issue</h1>
            <div className="issue-form">
                <form onSubmit={axiosIssueModify}>
                    <input 
                        className="issue-form-title"
                        name='issue_title' 
                        value={issue.issue_title} 
                        onChange={handleChange}
                    />
                    <select 
                        className="issue-form-label-select"
                        name='issue_label' 
                        value={issue.issue_label} 
                        onChange={handleChange}
                    >
                        <option value='bug'>bug</option>
                        <option value='documentation'>documentation</option>
                        <option value='duplicate'>duplicate</option>
                    </select>
                    <textarea 
                        className="issue-form-description"
                        name='issue_details' 
                        value={issue.issue_details} 
                        onChange={handleChange}
                    />
                    <div className="issue-form-buttons">
                        <button className="issue-form-submit" type='submit'>Update issue</button>
                        <Link to={`/issueRead/${issue.issue_no}`}>
                            <button className="issue-form-cancel">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IssueModify;
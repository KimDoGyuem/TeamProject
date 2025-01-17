import { useState, useEffect } from 'react';
import './Pages.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function IssueRead() { //loginId 굳이 안넘어와도 될듯? 세션으로 그냥 꺼내면 됨 BoardRead.js 참조
    const { issueNo } = useParams(); // URL 파라미터에서 projectId 가져오기
    const issue_no = parseInt(issueNo, 10); // 숫자 변환
    const [issue, setIssue] = useState({ 
        issue_no: 0,
        issue_project_no: 0,
        issue_title: "",
        issue_details: "",
        issue_label: "",
        issue_author: "",
        issue_date: "",
        comments: []});
    const [comment, setcomment] = useState('');
    const [loginName, setloginName] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 초기화
    
    useEffect(() => {
        handleLogin();
        axiosGetIssueByIssueNo();
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

    function axiosGetIssueByIssueNo() {
        axios.get(`http://localhost:8080/spring/company/getIssueByIssueNo?issueNo=${issue_no}`)
            .then((response) => {
                setIssue(response.data); 
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosIssueCommentWrite(e) {
        e.preventDefault();
        if(comment === ''){
            alert('공백 입력 금지!');
        }else{
            let body = { comment_issue_no: issue_no, comment_author: loginName, comment_text: comment }
            axios.post('http://localhost:8080/spring/company/issueCommentWrite', body)
                .then(() => {
                    setcomment('');
                    axiosGetIssueByIssueNo();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    function axiosIssueClose(e) {
        e.preventDefault();
        if(window.confirm(`"${issue.issue_no}"번 이슈를 닫으시겠습니까?`)){
            axios.get(`http://localhost:8080/spring/company/issueClose?issueNo=${issue_no}`)
                .then(()=>{
                    alert('!!issue Closed!!')
                    navigate(-1);
                })
                .catch(error => {
                    console.error('에러!', error);
                })
            }
    }

    return (
        <div id='issue_read_page'>
            <div id='Read_box'>
                <h1>{issue.issue_title}</h1>
                #{issue.issue_no} {issue.issue_is_closed ? 'closed at' : 'opened at'} {issue.issue_is_closed ? issue.issue_closedDate : issue.issue_date} by {issue.issue_author}
                <h5>{issue.issue_details}</h5>
                <h2>comments</h2>
                {issue.comments.map((c, i)=>
                    <div className='issue_comment' key={i}>
                        <h4>{c.comment_text}</h4>
                        #{c.comment_no} commented by {c.comment_author} at {c.comment_date}
                    </div>
                )}
                <hr />
                <form onSubmit={axiosIssueCommentWrite}>
                    <textarea style={{ width: '500px', height: '50px' }} value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='Add your comments here.'></textarea> <br />
                    <button type='submit'>댓글등록</button>
                </form>
                <hr />
                <button onClick={()=>navigate(-1)}>이전페이지로</button>
                {issue.issue_is_closed ? '' : <button onClick={(e)=>axiosIssueClose(e)}>이슈 닫기</button>}
                <hr />
            </div>
        </div>
    );
}

export default IssueRead;
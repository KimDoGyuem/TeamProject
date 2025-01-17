import { useState, useEffect } from 'react';
import './Pages.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function IssueList() { //loginId 굳이 안넘어와도 될듯? 세션으로 그냥 꺼내면 됨 BoardRead.js 참조
    const { pjNo } = useParams(); // URL 파라미터에서 projectId 가져오기
    const issue_project_no = parseInt(pjNo, 10); // 숫자 변환
    const [issues, setIssues] = useState([]);
    
    useEffect(() => {
        axiosGetIssue();
    }, []);

    function axiosGetIssue() {
        axios.get(`http://localhost:8080/spring/company/getIssue?pjNo=${issue_project_no}`)
            .then((response) => {
                setIssues(response.data); 
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='issue_list_page'>
            <div id='list_box'>
                <h3>이슈 리스트</h3>
                {issues.map((p, i)=>
                    <div className='issue' key={i}>
                        <Link to={`/issueRead/${p.issue_no}`}><h2>{p.issue_title}</h2></Link>
                        #{p.issue_no} {p.issue_is_closed ? 'closed at' : 'opened at'} {p.issue_is_closed ? p.issue_closedDate : p.issue_date} by {p.issue_author}
                    </div>
                )}
                <hr />
                <hr />
                <Link to='/'><button>프로젝트페이지로</button></Link>
                <Link to={`/issueWrite/${pjNo}`}><button>이슈 등록</button></Link>
                <hr />
            </div>
        </div>
    );
}

export default IssueList;
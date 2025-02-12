import { useState, useEffect } from 'react';
import './Pages.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Issue.css';
import Header from '../utilPages/Header';

function IssueList() {
    const { pjNo } = useParams(); // URL 파라미터에서 pjNo 가져오기
    const issue_project_no = parseInt(pjNo, 10); // 숫자 변환
    const [issues, setIssues] = useState([]); // 이슈 데이터 상태
    const [showClosed, setShowClosed] = useState(false); // 필터 상태
    const [loginId, setLoginId] = useState(null);
    const [loginName, setLoginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
    const [loginPosition, setLoginPosition] = useState('');
    const [isProjectMember, setIsProjectMember] = useState(false);
    const [isFinishedProject, setIsFinishedProject] = useState(false);

    // API 호출
    useEffect(() => {
        handleLogin();
    }, []);

    useEffect(() => {
        if (loginId) {
            axiosGetIssue();
            checkProjectParticipation();
            checkProjectFinished();
        }
    }, [loginId]);

    function handleLogin() {
        axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
        .then(response => {
            const loginInfo = response.data;
            setLoginId(loginInfo.company_id);
            setLoginName(loginInfo.company_name);
            setLoginRank(loginInfo.position_rank);
            setLoginPosition(loginInfo.position)
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    function checkProjectParticipation() {
        let body = { project_no: issue_project_no, company_id: loginId };
        axios.post(`http://localhost:8080/spring/company/checkProjectParticipation`, body, 
        { withCredentials: true })
        .then(response => {
            setIsProjectMember(response.data);
        })
        .catch(error => {
            console.error('프로젝트 참여 확인 중 에러 발생:', error);
        });
    }

    function checkProjectFinished() {
        axios.get(`http://localhost:8080/spring/company/checkProjectFinished?pjNo=${issue_project_no}`)
            .then(response => {
                setIsFinishedProject(response.data);
            })
            .catch(error => {
                console.error('프로젝트 상태 확인 중 에러:', error);
            });
    }

    function axiosGetIssue() {
        axios
            .get(`http://localhost:8080/spring/company/getIssue?pjNo=${issue_project_no}`)
            .then((response) => {
                setIssues(response.data); // 응답 데이터로 상태 업데이트
            })
            .catch((error) => {
                console.error('에러!', error);
            });
    }

    // 필터링된 이슈 데이터
    const filteredIssues = issues.filter((p) => p.issue_is_closed === showClosed);

    return (
        <div id='company_site'>
            <Header loginName={loginName} loginPosition={loginPosition} />
            <div className="issue-list-container">
                <div className="issue-header">
                    <div className="issue-filters">
                        <button className="filter-button">
                            {filteredIssues.length} {filteredIssues.length === 1 ? 'Issue' : 'Issues'}
                        </button>
                        <button 
                            className="filter-button"
                            onClick={() => setShowClosed(!showClosed)}
                        >
                            {showClosed ? '열린 이슈 보기' : '닫힌 이슈 보기'}
                        </button>
                    </div>
                    {isProjectMember && !isFinishedProject && (
                        <Link to={`/issueWrite/${issue_project_no}`}>
                            <button className="new-issue-button">New Issue</button>
                        </Link>
                    )}
                </div>

                <div className="issue-list">
                    {filteredIssues.map((p, i) => (
                        <div key={i} className="issue-item">
                            <div className="checkbox-column">
                                <input type="checkbox" className="issue-checkbox" />
                            </div>
                            <div className="issue-status">
                                {p.issue_is_closed ? '🔒' : '⭕'}
                            </div>
                            <div className="issue-content">
                                <Link 
                                    to={`/issueRead/${p.issue_no}`}
                                    className="issue-title"
                                >
                                    {p.issue_title}
                                    {p.issue_label && (
                                        <span className={`issue-label label-${p.issue_label.toLowerCase()}`}>
                                            {p.issue_label}
                                        </span>
                                    )}
                                </Link>
                                <div className="issue-meta">
                                    #{p.issue_no} {p.issue_is_closed ? 'closed' : 'opened'} by {p.issue_author}
                                </div>
                            </div>
                            {p.comment_count > 0 && (
                                <div className="issue-comments">
                                    💬 {p.comment_count}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="back-button-container">
                    <Link to="/">
                        <button className="back-button">프로젝트 관리 페이지로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default IssueList;
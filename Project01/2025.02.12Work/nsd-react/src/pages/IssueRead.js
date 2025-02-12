import { useState, useEffect, useCallback } from 'react';
import './Issue.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../utilPages/Header';

function IssueRead() {
    const { issueNo } = useParams(); // URL 파라미터에서 IssueNo 가져오기
    const issue_no = parseInt(issueNo, 10); // 숫자 변환
    const [issue, setIssue] = useState({ 
        issue_no: 0,
        issue_project_no: 0,
        issue_title: "",
        issue_details: "",
        issue_label: "",
        issue_author: "",
        issue_datetime: "",
        issue_is_closed: false,
        issue_closer: "",
        issue_closedDatetime: "",
        comments: []});
    const [comment, setComment] = useState('');
    const [editComment, setEditComment] = useState({
        comment_no: 0,
        comment_text: ''
    })
    const [loginId, setLoginId] = useState(null);
    const [loginName, setLoginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
    const [loginPosition, setLoginPosition] = useState('');
    const [isProjectMember, setIsProjectMember] = useState(false);
    
    useEffect(() => {
        handleLogin();
    }, []);

    const axiosGetIssueByIssueNo = useCallback(() => {
        axios.get(`http://localhost:8080/spring/company/getIssueByIssueNo?issueNo=${issue_no}`)
            .then((response) => {
                setIssue(response.data); 
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }, [issue_no]);

    const checkProjectParticipation = useCallback(() => {
        let body = { project_no: issue.issue_project_no, company_id: loginId };
        axios.post(`http://localhost:8080/spring/company/checkProjectParticipation`, body, 
        { withCredentials: true })
        .then(response => {
            setIsProjectMember(response.data);
        })
        .catch(error => {
            console.error('프로젝트 참여 확인 중 에러 발생:', error);
        });
    }, [issue.issue_project_no, loginId]);

    useEffect(() => {
        if (loginId) {
            axiosGetIssueByIssueNo();
            checkProjectParticipation();
        }
    }, [loginId, axiosGetIssueByIssueNo, checkProjectParticipation]);

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

    function axiosIssueClose(e) {
        let body = { issue_no: issue_no, issue_closer: loginName };
        e.preventDefault();
        if(window.confirm(`"${issue.issue_no}"번 이슈를 닫으시겠습니까?`)){
            axios.post(`http://localhost:8080/spring/company/issueClose?`, body)
                .then(()=>{
                    alert('!!issue Closed!!')
                    axiosGetIssueByIssueNo();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
            }
    }

    function axiosIssueReOpen(e) {
        e.preventDefault();
        if(window.confirm(`"${issue.issue_no}"번 이슈를 재오픈하시겠습니까?`)){
            axios.get(`http://localhost:8080/spring/company/issueReOpen?issueNo=${issue_no}`)
                .then(()=>{
                    alert('!!issue ReOpened!!')
                    axiosGetIssueByIssueNo();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
            }
    }

    function commentModify(cData) {
        setEditComment({
            comment_no: cData.comment_no,
            comment_text: cData.comment_text
        });
    }

    function handleCancelEdit() {
        setEditComment({ comment_no: 0, comment_text: '' });
    }

    function handleSubmitEdit(e) {
        e.preventDefault();
        if (editComment.comment_text.trim() === '') {
            alert('댓글 내용은 비워둘 수 없습니다.');
            return;
        }
        axios.post('http://localhost:8080/spring/company/issueCommentModify', editComment)
            .then(() => {
                setEditComment({ comment_no: 0, comment_text: '' });
                axiosGetIssueByIssueNo();
            })
            .catch(error => {
                console.error('댓글 수정 실패:', error);
            });
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const newComment = {
            comment_issue_no: issue.issue_no,
            comment_text: comment,
            comment_author: loginName
        };

        axios.post('http://localhost:8080/spring/company/issueCommentWrite', newComment)
            .then(() => {
                setComment('');
                axiosGetIssueByIssueNo();
            })
            .catch(error => {
                console.error('댓글 작성 실패:', error);
            });
    };

    return (
        <div id='company_site'>
            <Header loginName={loginName} loginPosition={loginPosition} />
            <div className="issue-detail-container">
                <div className="issue-header">
                    <div className="issue-title-section">
                        <h1>{issue.issue_title} <span className="issue-number">#{issue.issue_no}</span></h1>
                        <div className="issue-meta">
                            <span className={`issue-status ${issue.issue_is_closed ? 'closed' : 'open'}`}>
                                {issue.issue_is_closed ? '🔒 Closed' : '⭕ Open'}
                            </span>
                            <span className="issue-author">{issue.issue_author}</span> opened this issue on {issue.issue_datetime}
                            {issue.issue_is_closed && <span> • {issue.issue_closer} closed on {issue.issue_closedDatetime}</span>}
                        </div>
                    </div>
                </div>

                <div className="issue-body">
                    <div className="issue-main-content">
                        <div className="issue-details">
                            <p>{issue.issue_details}</p>
                        </div>

                        <div className="issue-comments">
                            {issue.comments.map((c, i) => (
                                <div key={i} className="comment-item">
                                    <div className="comment-header">
                                        <div>
                                            <strong>{c.comment_author}</strong>
                                            <span className="comment-date"> commented on {c.comment_datetime}</span>
                                        </div>
                                        {c.comment_author === loginName && (
                                            <button 
                                                className="edit-button"
                                                onClick={() => commentModify(c)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <div className="comment-body">
                                        <p>{c.comment_text}</p>
                                    </div>
                                    
                                    {editComment.comment_no === c.comment_no && (
                                        <form onSubmit={handleSubmitEdit} className="comment-edit-form">
                                            <textarea
                                                className="comment-textarea"
                                                value={editComment.comment_text}
                                                onChange={(e) => setEditComment((prev) => ({ 
                                                    ...prev, 
                                                    comment_text: e.target.value 
                                                }))}
                                            />
                                            <div className="button-group">
                                                <button type="submit" className="submit-button">Update comment</button>
                                                <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ))}

                            <form 
                                className="new-comment-form" 
                                onSubmit={handleCommentSubmit}
                            >
                                <textarea
                                    className="comment-textarea"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Leave a comment"
                                    disabled={issue.issue_is_closed}
                                />
                                <div className="issue-button-group">
                                    <button 
                                        type="submit" 
                                        className="submit-button"
                                        disabled={issue.issue_is_closed || !comment.trim()}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="issue-sidebar">
                        <div className="sidebar-buttons">
                            <Link to={`/issueList/${issue.issue_project_no}`} className="sidebar-button">
                                Back to Issues
                            </Link>
                            {issue.issue_author === loginName && (
                                <Link to={`/issueModify/${issue.issue_no}`} className="sidebar-button">
                                    Edit Issue
                                </Link>
                            )}
                                
                            {(isProjectMember || loginRank === 0) && (
                                issue.issue_is_closed ? (
                                    <button className="sidebar-openclose-button" onClick={axiosIssueReOpen}>Reopen Issue</button>
                                ) : (
                                    <button className="sidebar-openclose-button" onClick={axiosIssueClose}>Close Issue</button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueRead;
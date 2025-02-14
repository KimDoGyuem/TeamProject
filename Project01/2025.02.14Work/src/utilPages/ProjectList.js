import './utilPages.css';
import {useEffect, useState} from 'react'
import EmployeeInformation from './EmployeeInformation';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList({pjData, projectDelete,adminModeSelect, onExclude, loginId, onDrop}){    // 프로젝트 리스트와 참여 인원 리스트 컴포넌트

    const [isIssue, setIsIssue] = useState(false);
    // 날짜 포맷팅 함수 추가
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
    };

    useEffect(() => {
        axiosIssueCheck(pjData.project_no);
    }, []);

    function axiosIssueCheck(pjNo){
        axios.get(`http://localhost:8080/spring/company/issueCheck?pjNo=${pjNo}`)
        .then(response => {
                setIsIssue(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
    })
    }

    function IssueListButton(pjNo) {
        return (
          <Link to={`/issueList/${pjNo}`}><button>이슈 리스트</button></Link>
        );
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const employee = JSON.parse(e.dataTransfer.getData('employee'));
        onDrop({ company_id: employee.company_id, project_no: pjData.project_no });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return(
        <div>
            <fieldset
                style={{marginTop: '5px'}}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <legend>
                    {pjData.project_name} - {pjData.project_content} - {formatDate(pjData.project_startDate)} / {formatDate(pjData.project_endDate)} &nbsp;
                    {/* 이슈등록 버튼은 관리자이거나 프로젝트 참여 직원만 볼 수 있도록 수정 */}
                    {/* {(loginId === 'admin' || pjData.employee.some(emp => emp.company_id === loginId)) &&  */}
                    {(adminModeSelect === true || pjData.employee.some(emp => emp.company_id === loginId)) && 
                        <Link to={`/issueWrite/${pjData.project_no}`}><button>이슈 등록</button></Link>
                    }
                    {isIssue && IssueListButton(pjData.project_no)}
                    {/* {loginId === 'admin' && <button onClick={()=>projectDelete(pjData.project_no, pjData.project_name)}>프로젝트 종료</button>} */}
                    {adminModeSelect === true && <button onClick={()=>projectDelete(pjData.project_no, pjData.project_name)}>프로젝트 종료</button>}
                </legend>
                <div id='project_member_area'>
                    {pjData.employee.map((e,i)=>
                        <EmployeeInformation 
                            key={i} 
                            name={e.company_name} 
                            position={e.position} 
                            level={e.profile_photo} 
                            onclickEvent={() => onExclude(pjData.project_no,e.company_id)}
                        />
                    )}
                </div>
            </fieldset>
        </div>
    );
}

export default ProjectList;

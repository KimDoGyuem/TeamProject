import './utilPages.css';
import {useEffect, useState} from 'react'
import EmployeeInformation from './EmployeeInformation';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList({pjData, projectDelete, loginRank, onExclude}){    // 프로젝트 리스트와 참여 인원 리스트 컴포넌트

    const [isIssue, setIsIssue] = useState(false);

    useEffect(() => {
        axiosIssueCheck(pjData.no);
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

    return(
        <div>
            <fieldset>
                <legend>
                    {pjData.project_name} - {pjData.project_content} - {pjData.project_startDate} / {pjData.project_endDate} &nbsp;
                    {/* 이슈등록창(issueWrite.js와 연결)으로 가는 링크 (매개변수 = 해당 프로젝트 번호) */}
                    <Link to={`/issueWrite/${pjData.no}`}><button>이슈 등록</button></Link>
                    {isIssue && IssueListButton(pjData.no)}
                    {/* 프로젝트 이름값을 추가로 넘겨주게 변경 */}
                    {loginRank<=0 && <button onClick={()=>projectDelete(pjData.no, pjData.project_name)}>프로젝트 종료</button>}
                </legend>
                <div id='project_member_area'>
                    {pjData.employee.map((e,i)=>
                        <EmployeeInformation key={i} name={e.name} position={e.position} level={e.profile_photo} xxx={() => onExclude(pjData.no,e.company_id)}/>
                    )}
                </div>
            </fieldset>
        </div>
    );
}

export default ProjectList;

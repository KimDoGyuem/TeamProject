import './Pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectList from '../utilPages/ProjectList';
import EmployeeInformation from '../utilPages/EmployeeInformation';
import EmployeePopup from '../utilPages/EmployeePopup';

function ProjectManagement({ loginRank }) {
    const [pjName, setPjName] = useState('');
    const [pjContent, setPjContent] = useState('');
    const [pjPeriod, setPjPeriod] = useState('');
    const [pjList, setPjList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, employee: null });

    useEffect(() => {
        axiosGetProjectList(); //프로젝트 리스트(프로젝트 멤버 같이 넘어옴)
        axiosGetEmployeeList();
    }, []);

    function axiosGetProjectList() {
        axios.get('http://localhost:8080/spring/company/getProjectList')
            .then(response => {
                setPjList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosAddProject(e) {
        e.preventDefault();
        if(pjName === '' || pjContent === '' || pjPeriod === ''){
            alert('공백 입력 금지!');
        }else{
            let body = { project_name: pjName, project_content: pjContent, project_period: pjPeriod }
            axios.post('http://localhost:8080/spring/company/addProject', body)
                .then(() => {
                    setPjName('');
                    setPjContent('');
                    setPjPeriod('');
                    axiosGetProjectList();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    function axiosEndProject(pjNo) {
        axios.get(`http://localhost:8080/spring/company/endProject?no=${pjNo}`)
            .then(() => {
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosGetEmployeeList() {
        axios.get('http://localhost:8080/spring/company/getEmployeeList')
            .then(response => {
                setEmployeeList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function handleEmpClick(event, e) {
        const rect = event.target.getBoundingClientRect();
        setPopup({
            visible: true, x: rect.right + window.scrollX, y: rect.top + window.scrollY, employee: e
        });
    }

    function closePopup(employeeId, projectNo) {
        if (employeeId !== 'x' && projectNo > 0) {
            let b = { company_id: employeeId, project_number: projectNo }
            projectMemberAdd(b);
        }
        setPopup({ visible: false, x: 0, y: 0, employee: null });
    }

    function projectMemberAdd(b) {
        axios.post('http://localhost:8080/spring/company/projectMemberAdd', b)
            .then(response => {
                if(response.data === 1){
                    alert("이미 해당 프로젝트에 참여 중입니다");
                }
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function pmExclude(no,id) {
        let b ={ company_id: id, project_number: no}
        if(loginRank<=0){
            axios.post('http://localhost:8080/spring/company/pmExclude',b)
                .then(() => {
                    axiosGetProjectList();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    return (
        <div id='project_management_page'>
            <h3>프로젝트 리스트</h3>
            {pjList.map((p, i) => <ProjectList key={i} pjData={p} projectDelete={axiosEndProject} loginRank={loginRank} onExclude={pmExclude} />)}
            {loginRank <= 0 &&
                <fieldset>
                    <legend>프로젝트 추가</legend>
                    <form onSubmit={axiosAddProject}>
                        <input className='pj_input' value={pjName} onChange={(e) => setPjName(e.target.value)} placeholder="추가 할 프로젝트 명을 입력하세요" /><br />
                        <input className='pj_input' value={pjContent} onChange={(e) => setPjContent(e.target.value)} placeholder="프로젝트 내용을 입력하세요" /><br />
                        <input className='pj_input' value={pjPeriod} onChange={(e) => setPjPeriod(e.target.value)} placeholder="프로젝트 기간을 입력하세요" /><br />
                        <button type="submit">추가</button>
                    </form>
                </fieldset>
            }
            {loginRank <= 0 &&
                <fieldset>
                    <legend>사원 리스트</legend>
                    <div id='project_management_list_area'>
                        {employeeList.map((e, i) =>
                            <EmployeeInformation key={i} name={e.name} position={e.position} xxx={(event) => handleEmpClick(event, e)} />
                        )}
                    </div>
                </fieldset>
            }
            {popup.visible && (
                <EmployeePopup
                    x={popup.x}
                    y={popup.y}
                    departmentList={null}
                    projectList={pjList}
                    employee={popup.employee}
                    onDel={null}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}

export default ProjectManagement;
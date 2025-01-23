import './Pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectList from '../utilPages/ProjectList';
import EmployeeInformation from '../utilPages/EmployeeInformation';
import EmployeePopup from '../utilPages/EmployeePopup';

// npm install react-datepicker --save
// DatePicker 및 css 임포트
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ProjectManagement({ loginRank }) {
    const [pjName, setPjName] = useState('');
    const [pjContent, setPjContent] = useState('');
    const [pjList, setPjList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, employee: null });
    // 프로젝트 시작일 및 마감일 상태 관리
    const [pjStartDate, setPjStartDate] = useState(new Date());
    const [pjEndDate, setPjEndDate] = useState(null);
    // 날짜 선택 버튼 표시 여부 상태 관리
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
        console.log('시작일='+pjStartDate);
        console.log('종료일='+pjEndDate);
        if(pjName === '' || pjContent === ''){
            alert('공백 입력 금지!');
        }else{
            let body = { project_name: pjName, project_content: pjContent, project_startDate: pjStartDate, project_endDate: pjEndDate }
            axios.post('http://localhost:8080/spring/company/addProject', body)
                .then(() => {
                    setPjName('');
                    setPjContent('');
                    setPjStartDate(new Date());
                    setPjEndDate(null);
                    axiosGetProjectList();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    // 프로젝트를 마감할건지 예/아니오로 물어보고 '예'를 클릭시에만 마감기능 작동
    function axiosEndProject(pjNo, pjName) {
        if(window.confirm(`"${pjName}" 프로젝트를 마감하시겠습니까?`)){
            axios.get(`http://localhost:8080/spring/company/endProject?no=${pjNo}`)
            .then(() => {
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })    
        }
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

    // 날짜변경 버튼 클릭 시 시작일 달력만 보이도록
    const handleDateButtonClick = () => {
        setShowStartDatePicker(true);
        setShowEndDatePicker(false);
    };

    const onChangeStartDate = (date) => {
        if (date?.getTime() !== pjStartDate?.getTime()) {
            setPjStartDate(date);
            // 시작일 선택 후 종료일 달력 표시
            setShowStartDatePicker(false);
            setShowEndDatePicker(true);
        }
    };

    const onChangeEndDate = (date) => {
        if (date?.getTime() !== pjEndDate?.getTime()) {
            setPjEndDate(date);
            // 종료일 선택 후 달력 닫기
            setShowEndDatePicker(false);
        }
    };

    return (
        <div id='project_management_page'>
            <h3>프로젝트 리스트</h3>
            {pjList.map((p, i) => <ProjectList key={i} pjData={p} projectDelete={axiosEndProject} loginRank={loginRank} onExclude={pmExclude} />)}
            {loginRank <= 0 &&
                <fieldset>
                    <legend>프로젝트 추가</legend>
                    <form onSubmit={axiosAddProject} style={{ position: 'relative' }}>
                        <input className='pj_input' value={pjName} onChange={(e) => setPjName(e.target.value)} placeholder="추가 할 프로젝트 명을 입력하세요" /><br />
                        <input className='pj_input' value={pjContent} onChange={(e) => setPjContent(e.target.value)} placeholder="프로젝트 내용을 입력하세요" /><br />
                        프로젝트 시작일 : {pjStartDate?.toLocaleDateString("ko-KR")} || 프로젝트 마감일 : {pjEndDate?.toLocaleDateString("ko-KR")}<br/>
                        <button type="button" onClick={handleDateButtonClick}>
                            날짜변경
                        </button>
                        {showStartDatePicker && (
                            <div>
                                <p>시작일</p>
                                <DatePicker
                                    selected={pjStartDate}
                                    onChange={onChangeStartDate}
                                    inline
                                />
                            </div>
                        )}
                        {showEndDatePicker && (
                            <div>
                                <p>종료일</p>
                                <DatePicker
                                    selected={pjEndDate}
                                    onChange={onChangeEndDate}
                                    minDate={pjStartDate}
                                    inline
                                />
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button type="submit">추가</button>
                        </div>
                    </form>
                </fieldset>
            }
            {loginRank <= 0 &&
                <fieldset>
                    <legend>사원 리스트</legend>
                    <div id='project_management_list_area'>
                        {employeeList.map((e, i) =>
                            <EmployeeInformation key={i} name={e.name} position={e.position} level={e.profile_photo} xxx={(event) => handleEmpClick(event, e)} />
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
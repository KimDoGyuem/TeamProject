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
import LocalUrl from '../LocalUrl';

function ProjectManagement({loginId, adminModeSelect}) {

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        axiosGetProjectList(); //프로젝트 리스트(프로젝트 멤버 같이 넘어옴)
        axiosGetEmployeeList();
    }, []);

    function axiosGetProjectList() {
        axios.get(`${LocalUrl()}/company/getProjectList`)
            .then(response => {
                setPjList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosAddProject(e) {
        e.preventDefault();
        if(pjName === '' || pjContent === '' || pjStartDate === null || pjEndDate === null){
            alert('공백 입력 금지!');
        }else{
            let body = { project_name: pjName, project_content: pjContent, project_startDate: pjStartDate, project_endDate: pjEndDate }
            axios.post(`${LocalUrl()}/company/addProject`, body)
                .then(() => {
                    setPjName('');
                    setPjContent('');
                    setPjStartDate(new Date());
                    setPjEndDate(null);
                    axiosGetProjectList();
                    handleCloseDialog();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    // 프로젝트를 마감할건지 예/아니오로 물어보고 '예'를 클릭시에만 마감기능 작동
    function axiosEndProject(pjNo, pjName) {
        if(window.confirm(`"${pjName}" 프로젝트를 마감하시겠습니까?`)){
            axios.patch(`${LocalUrl()}/company/endProject?no=${pjNo}`)
            .then(() => {
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })    
        }
    }

    function axiosGetEmployeeList() {
        axios.get(`${LocalUrl()}/company/getEmployeeList`)
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
            visible: true,
            x: rect.right + window.scrollX,
            y: rect.top + window.scrollY,
            employee: e
        });
    }

    function closePopup(employeeId, projectNo) {
        if (employeeId !== 'x' && projectNo > 0) {
            let b = { company_id: employeeId, project_no: projectNo }
            projectMemberAdd(b);
        }
        setPopup({ visible: false, x: 0, y: 0, employee: null });
    }

    function projectMemberAdd(b) {
        axios.post(`${LocalUrl()}/company/projectMemberAdd`, b)
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
        let b ={ company_id: id, project_no: no}
        // 기존 코드
        // if(loginId === 'admin'){
        if(adminModeSelect === true){
            axios.delete(`${LocalUrl()}/company/pmExclude`,{data : b})
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

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setPjName('');
        setPjContent('');
        setPjStartDate(new Date());
        setPjEndDate(null);
    };

    // 드래그 시작 핸들러
    const handleDragStart = (e, employee) => {
        e.dataTransfer.setData('employee', JSON.stringify(employee));
    };

    return (
        // 기존 코드
        // <div id='project_management_page' style={{ backgroundColor: loginId === 'admin' ? 'rgb(230, 230, 230)' : 'white' }}>
        <div id='project_management_page' style={{ backgroundColor: adminModeSelect === true ? 'rgb(230, 230, 230)' : 'white' }}>
            <h3>프로젝트 리스트</h3>
            {pjList.map((p, i) => (
                <ProjectList 
                    key={i} 
                    pjData={p} 
                    projectDelete={axiosEndProject}
                    adminModeSelect={adminModeSelect}
                    // loginRank={loginRank} 
                    onExclude={pmExclude} 
                    loginId={loginId}
                    onDrop={projectMemberAdd}
                />
            ))}
            {/* 기존 코드 */}
            {/* {loginId === 'admin' && ( */}
            {adminModeSelect === true && (
                <button onClick={handleOpenDialog} className="add-project-button">
                    프로젝트 추가
                </button>
            )}

            <dialog open={isDialogOpen} className="project-dialog">
                <h2>프로젝트 추가</h2>
                <form onSubmit={axiosAddProject}>
                    <input 
                        className='pj_input' 
                        value={pjName} 
                        onChange={(e) => setPjName(e.target.value)} 
                        placeholder="추가 할 프로젝트 명을 입력하세요" 
                    />
                    <input 
                        className='pj_input' 
                        value={pjContent} 
                        onChange={(e) => setPjContent(e.target.value)} 
                        placeholder="프로젝트 내용을 입력하세요" 
                    />
                    <div className="date-info">
                        프로젝트 시작일: {pjStartDate?.toLocaleDateString("ko-KR")} 
                        프로젝트 마감일: {pjEndDate?.toLocaleDateString("ko-KR")}
                    </div>
                    <button type="button" onClick={handleDateButtonClick}>
                        날짜변경
                    </button>
                    {showStartDatePicker && (
                        <div className="date-picker-container">
                            <p>시작일</p>
                            <DatePicker
                                selected={pjStartDate}
                                onChange={onChangeStartDate}
                                inline
                            />
                        </div>
                    )}
                    {showEndDatePicker && (
                        <div className="date-picker-container">
                            <p>종료일</p>
                            <DatePicker
                                selected={pjEndDate}
                                onChange={onChangeEndDate}
                                minDate={pjStartDate}
                                inline
                            />
                        </div>
                    )}
                    <div className="dialog-buttons">
                        <button type="submit">추가</button>
                        <button type="button" onClick={handleCloseDialog}>취소</button>
                    </div>
                </form>
            </dialog>
            {/* 기존 코드 */}
            {/* {loginId === 'admin' && ( */}
            {adminModeSelect === true && (
                <fieldset>
                    <legend>사원 리스트</legend>
                    <div id='project_management_list_area'>
                        {employeeList.map((e, i) => (
                            <div 
                                key={i} 
                                draggable="true"
                                onDragStart={(event) => handleDragStart(event, e)}
                            >
                                <EmployeeInformation 
                                    name={e.company_name} 
                                    position={e.position} 
                                    level={e.profile_photo} 
                                    onclickEvent={(event) => handleEmpClick(event, e)}
                                />
                            </div>
                        ))}
                    </div>
                </fieldset>
            )}
            
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
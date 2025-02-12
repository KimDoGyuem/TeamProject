import { useEffect, useState } from 'react';
import './Pages.css';
import axios from 'axios';
import EmployeeInformation from '../utilPages/EmployeeInformation';
import EmployeePopup from '../utilPages/EmployeePopup';
import DepartmentMember from '../utilPages/DepartmentMember';

function EmployeeManagement() {

    const [employeeList, setEmployeeList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, employee: null });
    const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
    const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
    
    useEffect(() => {
        axiosGetEmployeeList(); //사원 리스트
        axiosGetDepartmentList(); //부서 리스트(부서 멤버도 같이 넘어옴)
    }, []);
    
    function axiosGetEmployeeList() {
        axios.get('http://localhost:8080/spring/company/getEmployeeList')
        .then(response => {
            setEmployeeList(response.data);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }
    
    function axiosGetDepartmentList() {
        axios.get('http://localhost:8080/spring/company/getDepartmentList')
        .then(response => {
            setDepartmentList(response.data);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }
    
    function axiosAddDepartment(e) {
        e.preventDefault();
        axios.get(`http://localhost:8080/spring/company/addDepartment?name=${departmentName}`)
        .then(() => {
            axiosGetDepartmentList();
            setDepartmentName('');
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
    
    function deleteEmployee(id) {
        axios.get(`http://localhost:8080/spring/company/deleteEmployee?id=${id}`)
        .then(() => {
            axiosGetEmployeeList();
            axiosGetDepartmentList();
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }
    
    function closePopup(employeeId, positionRank, departmentName) {
        if (employeeId !== 'x' && positionRank > 0 && departmentName === '') {   //직급 변경 
            let b1 = { company_id: employeeId, position_rank: positionRank };
            changePosition(b1);
        }
        if (employeeId !== 'x' && positionRank < 0 && departmentName !== '') {   //부서 변경
            let b2 = { company_id: employeeId, department: departmentName };
            departmentMemberAdd(b2);
        }
        setPopup({ visible: false, x: 0, y: 0, employee: null });
    }
    
    function changePosition(b1) {
        axios.post('http://localhost:8080/spring/company/changePosition', b1)
        .then(() => {
            axiosGetDepartmentList();
            axiosGetEmployeeList();
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }
    
    function departmentMemberAdd(b2) {
        axios.post('http://localhost:8080/spring/company/departmentMemberAdd', b2)
            .then(() => {
                axiosGetDepartmentList();
                axiosGetEmployeeList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
        }
        
        function emExclude(id) {
            axios.post(`http://localhost:8080/spring/company/emExclude?id=${id}`)
            .then(() => {
                axiosGetDepartmentList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
        }
        
        function deleteDepartment(departmentName) {
            axios.post(`http://localhost:8080/spring/company/deleteDepartment?department=${departmentName}`)
            .then(() => {
                axiosGetDepartmentList();
                axiosGetEmployeeList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
        }
        function departmentLeader(d_no, d_leader) {
        let b = { department_no: d_no, team_leader: d_leader }
        axios.post('http://localhost:8080/spring/company/departmentLeader', b)
        .then(() => {
            axiosGetDepartmentList();
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }
    
    //직원 추가 로직
    const [addName, setaddName] = useState('');
    const [addId, setaddId] = useState('');
    const [position, setPosition] = useState('사원');
    function addEmployee(e){
        e.preventDefault();
        // 직급에 따른 랭크 정하기
        const p = {'사원':2, '부장':1, '사장':0};
        let rank = p[position] ?? 2; // 객체의 프로퍼티 접근 방법 p['key'] 는 해당 key의 value 값이 나옴 / null, undefined 가 나올 경우 오른쪽 값(2)을 반환
        
        let body = {company_name:addName, company_id:addId, position:position, position_rank:rank};
        axios.post('http://localhost:8080/spring/company/addEmployee', body)
            .then(() => {
                setaddName('');
                setaddId('');
                setPosition('사원');
                axiosGetEmployeeList();
            })
            .catch(error => {
                console.error('에러1!', error);
            })
    }

    // 사원 추가 다이얼로그 핸들러
    const handleOpenEmployeeDialog = () => {
        setIsEmployeeDialogOpen(true);
    };

    const handleCloseEmployeeDialog = () => {
        setIsEmployeeDialogOpen(false);
        setaddName('');
        setaddId('');
        setPosition('사원');
    };

    // 부서 추가 다이얼로그 핸들러
    const handleOpenDepartmentDialog = () => {
        setIsDepartmentDialogOpen(true);
    };

    const handleCloseDepartmentDialog = () => {
        setIsDepartmentDialogOpen(false);
        setDepartmentName('');
    };

    return (
        <div id='employee_management_page'>
            <div id='department_list'>
                {departmentList.map((d, i) => <div id='department_box' key={i}>
                    <div id='department_name' >
                        [{d.department_name}] 부서<br />
                        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                            팀장:<select value={d.team_leader} onChange={(e) => departmentLeader(d.department_no, e.target.value)}>
                                <option key='0' value='미정'>미정</option>
                                {d.employee.map((e) => (
                                    <option key={e.company_name} value={e.company_name}>
                                        {e.company_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => deleteDepartment(d.department_name)}>폐부</button>
                    </div> &nbsp;
                    <DepartmentMember memberData={d} onExclude={emExclude} />
                </div>
                )}
            </div>

            <fieldset>
                <legend>사원 리스트</legend>
                <div id='employee_list_area'>
                    {employeeList.map((e, i) =>
                        <EmployeeInformation 
                            key={i} 
                            name={e.company_name} 
                            position={e.position} 
                            level={e.profile_photo} 
                            onclickEvent={(event) => handleEmpClick(event, e)} 
                        />
                    )}
                </div>
            </fieldset>

            <br />
            <div className="management-buttons">
                <button onClick={handleOpenDepartmentDialog} className="add-department-button">
                    부서 추가
                </button>
                <button onClick={handleOpenEmployeeDialog} className="add-employee-button">
                    사원 추가
                </button>
            </div>

            {/* 부서 추가 다이얼로그 */}
            {isDepartmentDialogOpen && (
                <div className="project-dialog-overlay">
                    <div className="project-dialog">
                        <h2>부서 추가</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            axiosAddDepartment(e);
                            handleCloseDepartmentDialog();
                        }}>
                            <div className="dialog-content">
                                <div className="input-group">
                                    <label>&nbsp;부서명</label>
                                    <input style={{marginTop: '10px'}}
                                        value={departmentName} 
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        placeholder="부서명을 입력하세요"
                                        className="pj_input"
                                    />
                                </div>
                            </div>
                            <div className="dialog-buttons">
                                <button type="submit">추가</button>
                                <button type="button" onClick={handleCloseDepartmentDialog}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 사원 추가 다이얼로그 */}
            {isEmployeeDialogOpen && (
                <div className="project-dialog-overlay">
                    <div className="project-dialog">
                        <h2>사원 추가</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addEmployee(e);
                            handleCloseEmployeeDialog();
                        }}>
                            <div className="dialog-content">
                                <div className="input-group" style={{marginBottom: '10px', width: '96%'}}>
                                    <input 
                                        value={addName} 
                                        onChange={(e) => setaddName(e.target.value)} 
                                        placeholder='이름'
                                        className="pj_input"
                                    />
                                </div>
                                <div className="input-group" style={{marginBottom: '10px', width: '96%'}}>
                                    <input 
                                        value={addId} 
                                        onChange={(e) => setaddId(e.target.value)} 
                                        placeholder='아이디'
                                        className="pj_input"
                                    />
                                </div>
                                <div className="input-group">
                                    <select 
                                        value={position} 
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="pj_input"
                                    >
                                        <option value='사원'>사원</option>
                                        <option value='부장'>부장</option>
                                        <option value='사장'>사장</option>
                                    </select>
                                </div>
                                <p className="password-hint">
                                    비밀번호 = 아이디+00 (ex. ID = asd / PW = asd00)
                                </p>
                            </div>
                            <div className="dialog-buttons">
                                <button type="submit">추가</button>
                                <button type="button" onClick={handleCloseEmployeeDialog}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {popup.visible && (
                <EmployeePopup
                    x={popup.x}
                    y={popup.y}
                    departmentList={departmentList}
                    projectList={null}
                    employee={popup.employee}
                    onDel={deleteEmployee}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}

export default EmployeeManagement;
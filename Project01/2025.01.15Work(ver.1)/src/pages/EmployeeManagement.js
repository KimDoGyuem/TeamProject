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
            let b1 = { company_id: employeeId, p_rank: positionRank };
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
        let b = { no: d_no, team_leader: d_leader }
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
        
        let body = {name:addName, company_id:addId, position:position, p_rank:rank};
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

    return (
        <div id='employee_management_page'>
            <div id='department_list'>
                {departmentList.map((d, i) => <div id='department_box' key={i}>
                    <div id='department_name' >
                        [{d.department_name}] 부서<br />
                        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                            팀장:<select value={d.team_leader} onChange={(e) => departmentLeader(d.no, e.target.value)}>
                                <option key='0' value='미정'>미정</option>
                                {d.employee.map((e) => (
                                    <option key={e.name} value={e.name}>
                                        {e.name}
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
                        <EmployeeInformation key={i} name={e.name} position={e.position} xxx={(event) => handleEmpClick(event, e)} />)}
                </div>
            </fieldset>

            <br />
            <form onSubmit={axiosAddDepartment}>
                &nbsp;&nbsp;
                <input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}></input> 
                <button type='submit'>부서 추가</button> &nbsp;
            </form>

            <div id='add_employees_box'>
                <form onSubmit={addEmployee}>
                    <input value={addName} onChange={(e) => setaddName(e.target.value)} placeholder='이름'></input>
                    <input value={addId} onChange={(e) => setaddId(e.target.value)} placeholder='아이디'></input>
                    <br/>
                    <select value={position} onChange={(e) => setPosition(e.target.value)}>
                        <option value='사원'>사원</option>
                        <option value='부장'>부장</option>
                        <option value='사장'>사장</option>
                    </select>
                    <br/>
                    <button type='submit'>사원추가</button>
                    <br/>
                    <span>
                        비밀번호 = 아이디+00 <br/>
                        (ex. ID = asd / PW = asd00)
                    </span>
                </form>
            </div>

            {popup.visible && (
                <EmployeePopup
                x={popup.x}
                y={popup.y}
                    departmentList={departmentList} //부서 리스트
                    projectList={null}
                    employee={popup.employee} //직원정보
                    onDel={deleteEmployee} //직원 삭제
                    onClose={closePopup} //닫기
                />
            )}
        </div>
    );
}

export default EmployeeManagement;
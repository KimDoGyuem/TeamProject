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
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function closePopup(employeeId, positionRank, DepartmentNo) {
        if (employeeId !== 'x' && positionRank > 0 && DepartmentNo < 0) {
            let b1 = { company_id: employeeId, position_rank: positionRank };
            changePosition(b1);
        }
        if (employeeId !== 'x' && positionRank < 0 && DepartmentNo > 0) {
            let b2 = { company_id: employeeId, department_no: DepartmentNo };
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

    function deleteDepartment(no){
        axios.post(`http://localhost:8080/spring/company/deleteDepartment?no=${no}`)
        .then(() => {
            axiosGetDepartmentList();
            axiosGetEmployeeList();
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    return (
        <div id='employee_management_page'>
            <div id='department_list'>
                {departmentList.map((d, i) => <div id='department_box' key={i}>
                    <div id='department_name' >
                        [{d.department_name}] 부서<br/>
                        <button onClick={() => deleteDepartment(d.no)}>폐부</button>
                    </div> &nbsp;
                    <DepartmentMember memberData={d} onExclude={emExclude} />
                </div>
                )}
            </div>

            <fieldset>
                <legend>사원 리스트</legend>
                <div id='employee_list_area'>
                    {employeeList.map((e, i) =>
                        <EmployeeInformation key={i} name={e.name} position={e.position_rank} xxx={(event) => handleEmpClick(event, e)} />)}
                </div>
            </fieldset>

            <form onSubmit={axiosAddDepartment}>
                <input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}></input>
                <button type='submit'>부서 추가</button>
            </form>

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
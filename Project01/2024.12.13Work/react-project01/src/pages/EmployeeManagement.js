import { useEffect, useState } from 'react';
import './Pages.css';
import axios from 'axios';
import EmployeeInformation from '../EmployeeInformation';

function EmployeeManagement() {

    const [employeeList, setEmployeeList] = useState([]);

    useEffect(()=>{
        axiosGetEmployeeList();
    },[]);

    function axiosGetEmployeeList(){
        axios.get('http://localhost:8080/spring/company/getEmployeeList')
        .then(response => {
            setEmployeeList(response.data);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    function handleEmpClick(event, e){
        alert("이벤트!");
    }

    return (
        <div id='employee_management_page'>
            <fieldset>
                <legend>사원 리스트</legend>
                <div id='employee_list_area'>
                    {employeeList.map((e,i) => 
                    <EmployeeInformation key={i} name={e.name} position={e.position_rank} xxx={(event) => handleEmpClick(event, e)}/>)}
                </div>
            </fieldset>

        </div>
    );
}

export default EmployeeManagement;
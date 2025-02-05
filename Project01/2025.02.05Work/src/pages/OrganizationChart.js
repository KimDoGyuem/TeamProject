import { useEffect, useState } from 'react';
import './Pages.css';
import axios from 'axios';

function OrganizationChart({ loginRank }) {

    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        axiosGetDepartmentList();
    }, []);

    function axiosGetDepartmentList() {
        axios.get('http://localhost:8080/spring/company/getDepartmentList')
            .then(response => {
                setDepartmentList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function memberList(d) {

        return (
            <div id='department_member'>
                {d.employee.map((e, i) => <div key={i}>{e.name} {e.position}</div>)}
            </div>
        );
    }

    return (
        <div id='organization_chart_page'>
            <div id='company_name'>
                <span>OO회사</span>
                <span>대표:사장</span>
            </div>
            <div id='department_list_box'>
                {departmentList.map((d, i) => <div id='department_block' key={i}>
                    <div id='department_name'>
                        <span>{d.department_name}부</span>
                        <span>팀장:{d.team_leader}</span>
                    </div>
                    {loginRank <= 2 && <>{memberList(d)}</>}
                </div>
                )}
            </div>
        </div>
    );
}

export default OrganizationChart;

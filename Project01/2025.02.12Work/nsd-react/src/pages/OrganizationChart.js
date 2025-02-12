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
            <div className='department-members-container'>
                <div className='vertical-line'></div>
                <div className='department-members'>
                    {d.employee.map((e, i) => (
                        <div key={i} className='member-box'>
                            {e.company_name} {e.position}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div id='organization_chart_page'>
            <div className='org-chart-wrapper'>
                <div id='company_name'>
                    <div className='department-title'>OO회사</div>
                    <div className='team-leader'>대표: 왕사장</div>
                </div>
                <div className='org-chart-container'>
                    {departmentList.map((d, i) => (
                        <div className='department-section' key={i}>
                            <div className='department-header'>
                                <div className='department-title'>{d.department_name}부</div>
                                <div className='team-leader'>부장: {d.team_leader}</div>
                            </div>
                            {loginRank <= 2 && memberList(d)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrganizationChart;

import { useEffect, useState } from 'react';
import './Pages.css';
import axios from 'axios';

function OrganizationChart({loginRank}) {

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

    function memberList({ d }) {

        function position(rank){
            const p = ['사원', '주임', '대리', '과장', '차장', '부장', '사장'];
            let pName = '';
    
            for(let i=0; i<p.length; i++){
                if(rank === i+1){
                    pName = p[i];
                    break;
                }
            }
            return(pName);
        };

        return (
            <div id='department_member'>
                {d.employee.map((e, i) => <div key={i}>{e.name} {position(e.position_rank)}</div>)}
            </div>
        );
    }

    return (
        <div id='organization_chart_page'>
            <div id='company_name'>OO회사</div>
            <div id='department_list_box'>
                {departmentList.map((d, i) => <div id='department_block' key={i}>
                    <div id='department_name'>{d.department_name}부</div>
                    {loginRank > 0 && <>{memberList({d})}</>}
                </div>
                )}
            </div>
        </div>
    );
}

export default OrganizationChart;

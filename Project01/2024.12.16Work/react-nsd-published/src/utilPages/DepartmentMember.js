import './utilPages.css';
import EmployeeInformation from './EmployeeInformation';

function DepartmentMember({memberData, onExclude}){ //부서 멤버 컴포넌트

    return(
        <div id='depart_menMember_area'>
            {memberData.employee.map((e,i)=>
                <EmployeeInformation key={i} name={e.company_name} level={e.profile_photo} position={e.position} onclickEvent={() => onExclude(e.company_id)}/>
            )}
        </div>
    );
}

export default DepartmentMember;
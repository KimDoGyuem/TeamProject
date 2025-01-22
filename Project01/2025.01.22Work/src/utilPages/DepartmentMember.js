import './utilPages.css';
import EmployeeInformation from './EmployeeInformation';

function DepartmentMember({memberData, onExclude}){ //부서 멤버 컴포넌트

    return(
        <div id='depart_mentMember_area'>
            {memberData.employee.map((e,i)=>
                <EmployeeInformation key={i} name={e.name} level={e.profile_photo} position={e.position} xxx={() => onExclude(e.company_id)}/>
            )}
        </div>
    );
}

export default DepartmentMember;
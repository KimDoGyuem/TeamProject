import './utilPages.css';
import EmployeeInformation from './EmployeeInformation';

function DepartmentMember({memberData, onExclude}){

    return(
        <div id='depart_mentMember_area'>
            {memberData.employee.map((e,i)=>
                <EmployeeInformation key={i} name={e.name} position={e.position} xxx={() => onExclude(e.company_id)}/>
            )}
        </div>
    );
}

export default DepartmentMember;
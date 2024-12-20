import './utilPages.css';
import EmployeeInformation from './EmployeeInformation';

function ProjectList({pjData, projectDelete, loginRank, onExclude}){

    return(
        <div>
            <fieldset>
                <legend>
                    {pjData.project_name} - {pjData.project_content} - {pjData.project_period} &nbsp;
                    {loginRank>=5 && <button onClick={()=>projectDelete(pjData.no)}>프로젝트 종료</button>}
                </legend>
                <div id='project_member_area'>
                    {pjData.employee.map((e,i)=>
                        <EmployeeInformation key={i} name={e.name} position={e.position_rank} xxx={() => onExclude(pjData.no,e.company_id)}/>
                    )}
                </div>
            </fieldset>
        </div>
    );
}

export default ProjectList;

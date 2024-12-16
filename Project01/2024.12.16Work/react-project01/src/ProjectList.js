import './App.css';

function ProjectList({pjData, projectDelete, loginRank}){

    return(
        <div>
            <fieldset>
                <legend>
                    {pjData.project_name} - {pjData.project_content} - {pjData.project_period} &nbsp;
                    {loginRank>=5 && <button onClick={()=>projectDelete(pjData.project_name)}>프로젝트 종료</button>}
                </legend>
                <div id='project_member_area'>
                    프로젝트 참여 멤버(아직 미완성)
                </div>
            </fieldset>
        </div>
    );
}

export default ProjectList;

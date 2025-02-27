import './Pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectList from '../utilPages/ProjectList';
import LocalUrl from '../LocalUrl';

function FinishedProjectList({ loginRank , LoginID }) {

    const [endPjList, setEndPjList] = useState([]);

    useEffect(() => {
        axiosGetEndProjectList(); //프로젝트 리스트(프로젝트 멤버 같이 넘어옴)
    }, []);

    function axiosGetEndProjectList() {
        axios.get(`${LocalUrl()}/company/getEndProjectList`)
            .then(response => {
                setEndPjList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='project_management_page'>
            <h3>마감된 프로젝트 리스트</h3>
            {endPjList.map((p, i) => (
                <ProjectList 
                    key={i} 
                    pjData={p} 
                    projectDelete={null} 
                    loginRank={loginRank} 
                    onExclude={()=>{}} 
                    loginId={LoginID}
                    onDrop={null}
                />
            ))}
        </div>
    );
}

export default FinishedProjectList;
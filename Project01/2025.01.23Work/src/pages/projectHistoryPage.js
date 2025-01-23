import './Pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectHistoryPage() {

    const [endPjList, setEndPjList] = useState([]);

    useEffect(() => {
        axiosGetEndProjectList(); //프로젝트 리스트(프로젝트 멤버 같이 넘어옴)
    }, []);

    function axiosGetEndProjectList() {
        axios.get('http://localhost:8080/spring/company/getEndProjectList')
            .then(response => {
                setEndPjList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='project_history_page'>
            <div id='stem_box'>
                <div id="stem_head"><span>NEXSADAN</span><span>PROJECT</span></div>
                {endPjList.map((ep, i) =>
                    <div id="stem_body" key={i}>
                        <div className="stem_line"></div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><div className='project_end_date'>{ep.project_startDate} ~ {ep.project_endDate}</div></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><div className="branch"></div></td>
                                    <td><div className="leaf">{ep.project_name}</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectHistoryPage;
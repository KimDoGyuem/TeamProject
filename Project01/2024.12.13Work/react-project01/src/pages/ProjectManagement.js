import './Pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectList from '../ProjectList';

function ProjectManagement({loginRank}) {
    const [pjName, setPjName] = useState('');
    const [pjContent, setPjContent] = useState('');
    const [pjPeriod, setPjPeriod] = useState('');
    const [pjList, setPjList] = useState([]);

    useEffect(()=>{
        axiosGetProjectList();
    },[]);
    
    function axiosGetProjectList() {
        axios.get('http://localhost:8080/spring/company/getProjectList')
            .then(response => {
                setPjList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosAddProject(e) {
        e.preventDefault();
        let body = { project_name: pjName, project_content: pjContent, project_period: pjPeriod }
        axios.post('http://localhost:8080/spring/company/addProject', body)
            .then(() => {
                setPjName('');
                setPjContent('');
                setPjPeriod('');
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosEndProject(pjName){
        axios.get(`http://localhost:8080/spring/company/endProject?name=${pjName}`)
            .then(()=>{
                axiosGetProjectList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='project_management_page'>
            <p>프로젝트 관리 페이지임(협업 프로젝트랑 같은페이지임) 여기는 프로젝트 생성 및 종료만 가능함</p>
            <p>{loginRank}랭크로 계정으로 접속중임(로그인 랭크에 따라 생성&종료 접근 가능함)</p>
            {pjList.map((p, i) => <ProjectList key={i} pjData={p} projectDelete={axiosEndProject} loginRank={loginRank}/>)}
            {loginRank>=5 &&
            <fieldset>
                <legend>프로젝트 추가</legend>
                <form onSubmit={axiosAddProject}>
                    <input className='pj_input' value={pjName} onChange={(e) => setPjName(e.target.value)} placeholder="추가 할 프로젝트 명을 입력하세요" /><br />
                    <input className='pj_input' value={pjContent} onChange={(e) => setPjContent(e.target.value)} placeholder="프로젝트 내용을 입력하세요" /><br />
                    <input className='pj_input' value={pjPeriod} onChange={(e) => setPjPeriod(e.target.value)} placeholder="프로젝트 기간을 입력하세요" /><br />
                    <button type="submit">추가</button>
                </form>
            </fieldset>
            }
        </div>
    );
}

export default ProjectManagement;
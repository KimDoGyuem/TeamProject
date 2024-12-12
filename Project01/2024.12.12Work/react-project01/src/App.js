import { useEffect, useState } from 'react';
import './App.css';
import ProjectHistoryPage from './projectHistoryPage';
import LoginPage from './LoginPage';

function App() {
  const [page, setPage] = useState('basic');
  const [logStatus, setLogStatus] = useState(false);
  const [rank1View, setRank1View] = useState(false);
  const [rank5View, setRank5View] = useState(false);
  const loginId = sessionStorage.getItem('loginId');
  // const loginRank = sessionStorage.getItem('loginRank');
  let loginRank = 0;

  useEffect(()=>{
    setLogStatus();
    buttonView();
  },[]);
  
  function PageRoad(e){
    setPage(e);
  }
  
  function logout(){
    sessionStorage.clear();
    setLogStatus(false)
  }
  
  function handleLogin(){
    setPage('basic');
    setLogStatus(true);
  }

  function buttonView(){
    if((4>=loginRank) && (loginRank>0)){
      setRank1View(true);
      setRank5View(false);
    }else if(loginRank>=5){
      setRank5View(true);
    }
  }
  
  console.log('세션 아이디='+loginId+' / 랭크='+loginRank);

  return (
    <div id='company_site'>
      <div id='main_top_box'>
        <div id='company_logo'>회사 로고</div>
        {logStatus ? <button className='login_button' onClick={logout}>로그아웃</button>:<button className='login_button' onClick={(e)=>PageRoad(e.target.value)} value={'login'}>로그인</button>}
      </div>
      <hr />
      <div id='main_middle_box'>
        <button id='main_button' onClick={(e)=>PageRoad(e.target.value)} value={'basic'}>메인 페이지</button>&nbsp;
        <button id='organization_chart_button'>조직도</button>&nbsp;
        <button id='project_history_button' onClick={(e)=>PageRoad(e.target.value)} value={'pj_history'}>프로젝트 연혁</button>&nbsp;
        {rank1View && <button id='collaborative_project_button'>협업 프로젝트</button>} &nbsp;
        {rank1View && <button id='board_button'>게시판</button>} &nbsp;
        {rank5View && <button id='employee_management_button'>사원관리</button>} &nbsp;
        {rank5View && <button id='project_management_button'>프로젝트 관리</button>} &nbsp;
      </div>
      <hr />
      <div id='main_bottom_box'>
        {'basic'===page && <p>메인 페이지임</p>}
        {'pj_history'===page && <ProjectHistoryPage/>}
        {'login'===page && <LoginPage onLogin={handleLogin}/>}
      </div>
    </div>
  );
}
export default App;
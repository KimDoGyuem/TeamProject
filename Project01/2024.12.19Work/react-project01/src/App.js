import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import OrganizationChart from './pages/OrganizationChart';
import ProjectHistoryPage from './pages/projectHistoryPage';
import ProjectManagement from './pages/ProjectManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Board from './board/Borad';
import BoardGetList from './board/BoardGetList';
import { useNavigate } from 'react-router-dom';

function App() {
  const [page, setPage] = useState('basic'); 
  const [logStatus, setLogStatus] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginRank, setLoginRank] = useState(0); 
  const [boardCategory, setBoardCategory] = useState(''); 
  
  const navi = useNavigate(); // 루터 테스트임
  
  useEffect(() => {
    const storedLoginId = sessionStorage.getItem('loginId'); // 새로고침 시 로그인 정보 반영 로직 ~
    const storedLoginRank = sessionStorage.getItem('loginRank');
    if (storedLoginId) {
      setLoginId(storedLoginId);
      setLoginRank(storedLoginRank);
      setLogStatus(true);
    }// ~ 여기까지
  }, []);

  function PageRoad(p) { // 페이지 로드 처리 로직
    setPage(p);
  }

  function logout() { // 로그아웃 처리 로직
    setPage('basic'); // 메인페이지로 이동 처리
    sessionStorage.clear(); // 세션 전부 비우기 
    setLogStatus(false); // 로그인 상태 비활성화
    setLoginId(null); 
    setLoginRank(0);
  }
  
  // 수정 필요하지만 일단 보류
  function handleLogin(loginInfo) { // 로그인 시 화면에 즉시 정보 반영 로직
    setPage('basic'); 
    setLogStatus(true); 
    setLoginId(loginInfo.company_id); 
    setLoginRank(loginInfo.position_rank);
    sessionStorage.setItem('loginId', loginInfo.company_id);
    sessionStorage.setItem('loginRank', loginInfo.position_rank);
  }

  function BoardPageRoad(v,c){
    setPage(v);
    setBoardCategory(c);
  }

  return (
    <div id='company_site'>
      <div id='main_top_box'>
        <div id='company_logo'>회사 로고</div>
        <div id='login_box'>
          {logStatus ? <button className='login_button' onClick={logout}>로그아웃</button> : <button className='login_button' onClick={() => PageRoad('login')}>로그인</button>}
          로그인 : {loginId} <br />
          랭크 : {loginRank}
        </div>
      </div>
      <hr />
      <div id='main_middle_box'>
        <button id='main_button' onClick={() => PageRoad('basic')}>메인 페이지</button>&nbsp;
        <button id='organization_chart_button' onClick={() => PageRoad('organization_chart')}>조직도</button>&nbsp;
        <button id='project_history_button' onClick={() => PageRoad('project_history')}>연혁</button>&nbsp;
        {loginRank > 0 && <button id='collaborative_project_button' onClick={() => PageRoad('project_management')}>프로젝트 현황</button>} &nbsp;
        {loginRank > 0 && <button id='board_button' onClick={() => PageRoad('board')}>게시판</button>} &nbsp;
        {loginRank >= 5 && <button id='employee_management_button' onClick={() => PageRoad('employee_management')}>사원관리</button>} &nbsp;
        {loginRank >= 5 && <button id='project_management_button' onClick={() => PageRoad('project_management')}>프로젝트 관리</button>} &nbsp;
      </div>
      <hr />
      <div id='main_bottom_box'>
        {'login' === page && <LoginPage onLogin={handleLogin} />}
        {'basic' === page &&
          <div>
            <p>메인 페이지임(여기는 컴포넌트 따로 없음 그냥 메모장임..)</p>
              <hr />
              <p>회원가입 기능은 만들어야 하는가?</p>
              <hr />
              <p>메인페이지, 조직도, 프로젝트 연혁 - 일반인</p>
              <p>협업 프젝, 게시판 - 사원 이상(1랭~4랭)</p>
              <p>사원관리, 프젝 관리 - 고위직(5랭~7랭)</p>
              <p>사장(7) - 부장(6) - 차장(5) - 과장(4) - 대리(3) - 주임(2) - 사원(1)</p>
              <p>[직원 총 10명] 보스 : 보스, 사원01~05 : 부장~주임, 사원06~09 : 사원</p>
              <hr />
              <p>게시판 만들기</p>
              <p>메인 컴포넌트(카테고리,인기글,+커뮤니티 기능 뭐 있지?)</p>
              <p>글 리스트 가져오는 컴포넌트</p>
              <p>글 쓰기 컴포넌트</p>
              <p>글 읽기 컴포넌트</p>
              <p>글 수정 컴포넌트</p>
              <p></p>
          </div>
        }
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank}/>}
        {'project_history' === page && <ProjectHistoryPage />}
        {'project_management' === page && <ProjectManagement loginRank={loginRank} />}
        {'employee_management' === page && <EmployeeManagement />}
        {'board' === page && <Board page={BoardPageRoad} />}
        {'board_getList' === page && <BoardGetList loginId={loginId} category={boardCategory} />}
      </div>
      <button onClick={()=> navi('/login')}>루터테스트</button>
    </div>
  );
}
export default App;
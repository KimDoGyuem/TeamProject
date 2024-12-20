import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import OrganizationChart from './pages/OrganizationChart';
import ProjectHistoryPage from './pages/projectHistoryPage';
import ProjectManagement from './pages/ProjectManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Board from './board/Borad';
import BoardGetList from './board/BoardGetList';
import BoardWrite from './board/BoardWrite';
import BoardRead from './board/BoardRead';
import { useNavigate } from 'react-router-dom';

function App() {
  const [page, setPage] = useState('basic'); 
  const [logStatus, setLogStatus] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginRank, setLoginRank] = useState(0); 
  const [boardCategory, setBoardCategory] = useState(''); 
  const [postNo, setPostNo] = useState(0); 
  
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

  function BoardPageRoad(p,c){
    setPage(p);
    setBoardCategory(c);
  }
  
  function readPageNo(p,n){
    setPage(p);
    setPostNo(n);
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
        {loginRank >= 5 && <button id='board_management_button'>게시판 관리</button>} &nbsp;
      </div>
      <hr />
      <div id='main_bottom_box'>
        {'login' === page && <LoginPage onLogin={handleLogin} />}
        {'basic' === page &&
          <div>
            <p>메인 페이지임(여기는 컴포넌트 따로 없음 그냥 메모장임..)</p>
              <hr />
              <p>메인페이지, 조직도, 연혁 - 일반인</p>
              <p>프젝현황, 게시판 - 사원 이상(1랭~7랭)</p>
              <p>사원관리, 프젝 관리 - 고위직(5랭~7랭)</p>
              <p>사장(7) - 부장(6) - 차장(5) - 과장(4) - 대리(3) - 주임(2) - 사원(1)</p>
              <hr />
              <p>게시판 만들기</p>
              <p>글 리스트 컴포넌트</p>
              <p>글 쓰기 컴포넌트</p>
              <p>글 읽기 컴포넌트</p>
              <p>글 수정 컴포넌트</p>
              <p>글 삭제 기능</p>
              <hr />
              <p>댓글처리 하다 끝났음(미완성)</p>
              <p>게시글 테이블이랑 댓글 테이블 나누는거 생각 좀 해봐야 할 듯(글번호 문제 때문에...)</p>
          </div>
        }
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank}/>}
        {'project_history' === page && <ProjectHistoryPage />}
        {'project_management' === page && <ProjectManagement loginRank={loginRank} />}
        {'employee_management' === page && <EmployeeManagement />}
        {'board' === page && <Board page={BoardPageRoad} />}
        {'board_getList' === page && <BoardGetList loginId={loginId} category={boardCategory} page={PageRoad} readPage={readPageNo}/>}
        {'board_write' === page && <BoardWrite loginId={loginId} category={boardCategory} page={BoardPageRoad}/>}
        {'board_read' === page && <BoardRead loginId={loginId} category={boardCategory} postNo={postNo} page={BoardPageRoad}/>}
      </div>
      <button onClick={()=> navi('/login')}>루터테스트</button>
    </div>
  );
}
export default App;
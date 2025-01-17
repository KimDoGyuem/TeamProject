import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import OrganizationChart from './pages/OrganizationChart';
import ProjectHistoryPage from './pages/projectHistoryPage';
import ProjectManagement from './pages/ProjectManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Board from './board/Board';
import BoardGetList from './board/BoardGetList';
import BoardWrite from './board/BoardWrite';
import BoardRead from './board/BoardRead';
import BoardModify from './board/BoardModify';
import BoardManagement from './board/BoardManagement';
import { useNavigate, Link } from 'react-router-dom';

function App() {
  const [page, setPage] = useState(''); // 상위 페이지 로드 
  const [logStatus, setLogStatus] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginName, setloginName] = useState(null);
  const [loginRank, setLoginRank] = useState(3);
  const [boardCategory, setBoardCategory] = useState(''); // 게시판 카테고리 페이지 로드 
  const [postNo, setPostNo] = useState(0);  // 게시판 글 읽기 페이지 로드
  const [adminAccess, setAdminAccess] = useState(null);

  const navi = useNavigate(); // 루터 테스트임

  useEffect(() => {
    handleLogin();
    refreshPage();
  }, []);

  function PageRoad(p) { // 페이지 로드 처리 로직
    sessionStorage.setItem('page', p);
    refreshPage();
    if (p === 'basic') {
      sessionStorage.clear(); // 메인 페이지 이동 시 전체 세션 클리어
      console.log('sessionStorage 초기화 됨');
    } 
    if(p !== 'board_read' && p !== 'board_getList'){
      sessionStorage.removeItem('category');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
      sessionStorage.removeItem('postNo');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
    }
  }

  function refreshPage() {
    let page = sessionStorage.getItem('page');
    if (page === null) {
      page = 'basic';
    }
    if (sessionStorage.getItem('category') !== null){
      setBoardCategory(sessionStorage.getItem('category'));
    }
    if(sessionStorage.getItem('postNo') !== null){
      setPostNo(sessionStorage.getItem('postNo'));
    }
    setPage(page);
  }

  function handleLogin() {
    axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
      .then(response => {
        const loginInfo = response.data;
        setLoginId(loginInfo.company_id);
        setloginName(loginInfo.name);
        setLoginRank(loginInfo.p_rank);
        if (loginInfo.company_id == null) {
          setLogStatus(false);
        } else {
          setLogStatus(true);
        }
      })
      .catch(error => {
        console.error('에러2!', error);
      })
  }

  function logout() {
    axios.get('http://localhost:8080/spring/company/logout', { withCredentials: true })
      .then(() => {
        // 명시적으로 상태 초기화
        setLogStatus(false);
        setLoginId(null);
        setloginName(null);
        setLoginRank(3);
      
      // 세션 초기화
      sessionStorage.clear();
      sessionStorage.setItem('page', 'basic');

        // 페이지 갱신
        refreshPage();
      })
      .catch(error => {
        console.error('에러2!', error);
      })
  }

  function BoardPageRoad(p, c) { //선택한 카테고리 게시판으로 이동
    sessionStorage.setItem('category', c);
    PageRoad(p);
  }
  
  function readPageNo(p, n ,a) { //선택한 글로 이동
    if(n !== undefined){
      sessionStorage.setItem('postNo', n);
    }
    if(a === 0){
      setAdminAccess('adminAccess');
    }else{
      setAdminAccess(null);
    }
    PageRoad(p);
  }

  return (
    <div id='company_site'>
      <div id='main_top_box'>
        <div id='company_logo'>회사 로고</div>
        <div id='login_box'>
          {logStatus ? <button className='login_button' onClick={logout}>로그아웃</button> : <button className='login_button' onClick={() => PageRoad('login')}>로그인</button>}
          {logStatus ? <Link to="/mypage"><button>마이페이지</button></Link> : ""}
          {logStatus ? 
          <>아이디 : {loginId} <br />
          이름 : {loginName} <br />
          랭크 : {loginRank}</> : "" }
        </div>
      </div>
      <hr />
      <div id='main_middle_box'>
        <button id='main_button'className={page === 'basic' ? 'active-button' : ''} onClick={() => PageRoad('basic')}>메인 페이지</button>&nbsp;
        <button id='organization_chart_button' onClick={() => PageRoad('organization_chart')}>조직도</button>&nbsp;
        <button id='project_history_button' onClick={() => PageRoad('project_history')}>연혁</button>&nbsp;
        {loginRank <= 2 && <button id='collaborative_project_button' onClick={() => PageRoad('project_management')}>프로젝트 현황</button>} &nbsp;
        {loginRank <= 2 && <button id='board_button' onClick={() => PageRoad('board')}>게시판</button>} &nbsp;
        {loginRank <= 0 && <button id='employee_management_button' onClick={() => PageRoad('employee_management')}>사원관리</button>} &nbsp;
        {loginRank <= 0 && <button id='project_management_button' onClick={() => PageRoad('project_management')}>프로젝트 관리</button>} &nbsp;
        {loginRank <= 0 && <button id='board_management_button' onClick={() => PageRoad('board_management')}>게시판 관리</button>} &nbsp;
      </div>
      <hr />
      <div id='main_bottom_box'>
        {'login' === page && <LoginPage onLogin={handleLogin} mainPageRoad={refreshPage} />}
        {'basic' === page &&
          <div>
            <p>메인 페이지임</p>
            <hr />
            <p>메인페이지, 조직도, 연혁 - 일반인</p>
            <p>프젝현황, 게시판 - 사원 이상</p>
            <p>사원관리, 프젝 관리 - 고위직</p>
            <p>사장(0) - 부장(1) - 사원(2)</p>
            <hr />
            <p>남은 작업</p>
            <p>정리 중</p>
            <p>이슈 내용</p>
            <p>정리 중</p>
          </div>
        }
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank} />}
        {'project_history' === page && <ProjectHistoryPage />}
        {'project_management' === page && <ProjectManagement loginRank={loginRank} />}
        {'employee_management' === page && <EmployeeManagement />}
        {/* {'board' === page && <Board page={BoardPageRoad} />} */}
        {'board' === page && <Board page={BoardPageRoad} readPage={readPageNo} />}
        {'board_getList' === page && <BoardGetList category={boardCategory} page={PageRoad} readPage={readPageNo} loginRank={loginRank} />} {/* ★여기수정 */}
        {'board_write' === page && <BoardWrite loginId={loginId} loginName={loginName} category={boardCategory} page={BoardPageRoad} />}
        {'board_read' === page && <BoardRead loginId={loginId} loginName={loginName} postNo={postNo} adAc={adminAccess} page={BoardPageRoad} readPage={readPageNo} />}
        {'board_modify' === page && <BoardModify postNo={postNo} readPage={readPageNo} />}
        {'board_management' === page && <BoardManagement readPage={readPageNo}/>}
      </div>
      <button onClick={() => navi('/login')}>루터테스트</button>
    </div>
  );
}
export default App;
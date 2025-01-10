import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// import LoginPage from './pages/LoginPage';
// import OrganizationChart from './pages/OrganizationChartPage';
// import ProjectHistoryPage from './pages/projectHistoryPage';
// import ProjectManagement from './pages/ProjectManagement';
// import EmployeeManagement from './pages/EmployeeManagement';
// import Board from './board/Borad';
// import BoardGetList from './board/BoardGetList';
// import BoardWrite from './board/BoardWrite';
// import BoardRead from './board/BoardRead';
// import BoardModify from './board/BoardModify';
// import BoardManagement from './board/BoardManagement';
import { useNavigate } from 'react-router-dom';

function App({Display}) {
  const [page, setPage] = useState(''); // 상위 페이지 로드 
  const [logStatus, setLogStatus] = useState(false);
  // const [loginId, setLoginId] = useState(null);
  // const [loginName, setloginName] = useState(null);
  // const [loginRank, setLoginRank] = useState(3);
  const [boardCategory, setBoardCategory] = useState(''); // 게시판 카테고리 페이지 로드 
  const [postNo, setPostNo] = useState(0);  // 게시판 글 읽기 페이지 로드

  const navigate = useNavigate(); 

  useEffect(() => {
    // handleLogin();
    // refreshPage();                                                         
  }, []);

  //@@
  function PageRoad(p) { // 페이지 로드 처리 로직                         
    sessionStorage.setItem('page', p);      
    refreshPage();
    if (p === 'basic') {
      sessionStorage.clear(); // 메인 페이지 이동 시 전체 세션 클리어
      console.log('sessionStorage 초기화 됨');
    }
    if (p !== 'board_read' && p !== 'board_getList') {
      sessionStorage.removeItem('category');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
      sessionStorage.removeItem('postNo');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
    }
  }

  //@@
  function refreshPage() {                                                
    let page = sessionStorage.getItem('page');
    if (page === null) {
      page = 'basic';
    }
    if (sessionStorage.getItem('category') !== null) {
      setBoardCategory(sessionStorage.getItem('category'));
    }
    if (sessionStorage.getItem('postNo') !== null) {
      setPostNo(sessionStorage.getItem('postNo'));
    }
    setPage(page);
  }

  // function handleLogin() {
  //   axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
  //     .then(response => {
  //       const loginInfo = response.data;
  //       setLoginId(loginInfo.company_id);
  //       setloginName(loginInfo.name);
  //       setLoginRank(loginInfo.p_rank);
  //       if (loginInfo.company_id == null) {
  //         setLogStatus(false);
  //       } else {
  //         setLogStatus(true);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('에러2!', error);
  //     })
  // }

  
  function logout() {
    axios.get('http://localhost:8080/spring/company/logout', { withCredentials: true })
    .then(() => {
      // handleLogin();
      // sessionStorage.setItem('page', 'basic'); // 로그아웃 시 메인 페이지 주소로 세션 저장  //@@
      // refreshPage(); // 로그아웃 시 메인 페이지로 이동                                      //@@
      sessionStorage.clear();
      document.location.reload();
    })
    .catch(error => {
      console.error('에러2!', error);
    })
  }
  
  function BoardPageRoad(p, c) { //선택했던 카테고리 게시판으로 이동
    sessionStorage.setItem('category', c);
    PageRoad(p);
  }
  
  function readPageNo(p, n) { //읽고싶은 글로 이동
    sessionStorage.setItem('postNo', n);
    PageRoad(p);
  }
  
  let pathName = window.location.pathname;  // pathName = 현재 브라우저의 URL 경로 
  
  let loginId = sessionStorage.getItem('loginId');
  let loginName = sessionStorage.getItem('loginName');
  let loginRank = sessionStorage.getItem('loginRank');
  
  return (
    <div id='company_site'>
      <div id='main_top_box'>
        <div id='company_logo'>회사 로고</div>
        <div id='login_box'>
          {loginRank !== null && loginRank < 3 ? <button className='login_button' onClick={logout}>로그아웃</button> : <button className='login_button' onClick={() => navigate('/login')}>로그인</button>}
          아이디 : {loginId} <br />
          이름 : {loginName} <br />
          랭크 : {loginRank}
        </div>
      </div>
      <hr />
      <div id='main_middle_box'>
        {/* <button id='main_button' onClick={() => PageRoad('basic')}>메인 페이지</button>&nbsp; */}
        <button id='main_button' onClick={() => navigate('/')}>메인 페이지</button>&nbsp;
        {/* <button id='organization_chart_button' onClick={() => PageRoad('organization_chart')}>조직도</button>&nbsp; */}
        <button id='organization_chart_button' onClick={() => navigate('/')}>조직도</button>&nbsp;
        <button id='project_history_button' onClick={() => PageRoad('project_history')}>연혁</button>&nbsp;
        {loginRank <= 2 && <button id='collaborative_project_button' onClick={() => PageRoad('project_management')}>프로젝트 현황</button>} &nbsp;
        {loginRank <= 2 && <button id='board_button' onClick={() => PageRoad('board')}>게시판</button>} &nbsp;
        {loginRank <= 0 && <button id='employee_management_button' onClick={() => PageRoad('employee_management')}>사원관리</button>} &nbsp;
        {loginRank <= 0 && <button id='project_management_button' onClick={() => PageRoad('project_management')}>프로젝트 관리</button>} &nbsp;
        {loginRank <= 0 && <button id='board_management_button' onClick={() => PageRoad('board_management')}>게시판 관리</button>} &nbsp;
      </div>
      <hr />
      <div id='main_bottom_box'>

        {'/' === pathName && 
          <div>
            <p>메인 페이지임(여기는 컴포넌트 따로 없음 그냥 메모장임..)</p>
            <hr />
            <p>메인페이지, 조직도, 연혁 - 일반인</p>
            <p>프젝현황, 게시판 - 사원 이상</p>
            <p>사원관리, 프젝 관리 - 고위직</p>
            <p>사장(0) - 부장(1) - 사원(2)</p>
            <hr />
            <p>남은 작업 - 브라우저 루터 적용 해보기</p>
          </div>
        }

        {Display && <Display />}

        {/* {'login' === page && <LoginPage onLogin={handleLogin} mainPageRoad={refreshPage} />}
        {'basic' === page &&        }
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank} />}
        {'project_history' === page && <ProjectHistoryPage />}
        {'project_management' === page && <ProjectManagement loginRank={loginRank} />}
        {'employee_management' === page && <EmployeeManagement />}
        {'board' === page && <Board page={BoardPageRoad} />}
        {'board_getList' === page && <BoardGetList category={boardCategory} page={PageRoad} readPage={readPageNo} />}
        {'board_write' === page && <BoardWrite loginId={loginId} loginName={loginName} category={boardCategory} page={BoardPageRoad} />}
        {'board_read' === page && <BoardRead loginId={loginId} loginName={loginName} category={boardCategory} postNo={postNo} page={BoardPageRoad} readPage={readPageNo} />}
        {'board_modify' === page && <BoardModify postNo={postNo} readPage={readPageNo} />}
        {'board_management' === page && <BoardManagement readPage={readPageNo} />} */}

      </div>

    </div>
  );
}
export default App;
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
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import banner_1 from './images/banner_1.jpg';
import banner_2 from './images/banner_2.png';
import scrollToTopButton from './images/sc.png';

function App() {
  const [page, setPage] = useState(''); // 상위 페이지 로드 
  const [logStatus, setLogStatus] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginName, setloginName] = useState(null);
  const [loginRank, setLoginRank] = useState(3);
  const [loginPosition, setLoginPosition] = useState('');
  const [boardCategory, setBoardCategory] = useState(''); // 게시판 카테고리 페이지 로드 
  const [postNo, setPostNo] = useState(0);  // 게시판 글 읽기 페이지 로드
  const [adminAccess, setAdminAccess] = useState(null);

  useEffect(() => {
    handleLogin();
    refreshPage();
  }, []);

  function PageRoad(p) { // 페이지 로드 처리 로직
    sessionStorage.setItem('page', p);
    refreshPage();
    if (p === 'main') {
      sessionStorage.clear(); // 메인 페이지 이동 시 전체 세션 클리어
      console.log('sessionStorage 초기화 됨');
    }
    if (p !== 'board_read' && p !== 'board_getList' && p !== 'board_write' && p !== 'board_modify' && p !== 'board') {
      sessionStorage.removeItem('category');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
      sessionStorage.removeItem('postNo');  // 게시판 에서 다른 페이지로 이동 시 게시판 관련 세션 클리어
    }
  }

  function refreshPage() {
    let page = sessionStorage.getItem('page');
    if (page === null) {
      page = 'main';
    }
    if (sessionStorage.getItem('category') !== null) {
      setBoardCategory(sessionStorage.getItem('category'));
    }
    if (sessionStorage.getItem('postNo') !== null) {
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
        setLoginPosition(loginInfo.position)
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
        sessionStorage.setItem('page', 'main');

        // 페이지 갱신
        refreshPage();
      })
      .catch(error => {
        console.error('에러2!', error);
      })
  }

  function BoardPageRoad(p, c) { //선택한 카테고리 게시판으로 이동
    if (c !== undefined) {
      sessionStorage.setItem('category', c);
    }
    PageRoad(p);
  }

  function readPageNo(p, n, a) { //선택한 글로 이동
    if (n !== undefined) {
      sessionStorage.setItem('postNo', n);
    }
    if (a === 0) {
      setAdminAccess('adminAccess');
    } else {
      setAdminAccess(null);
    }
    PageRoad(p);
  }


  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categories = [
    { name: '부서', options: ['조직도', '사원관리'] },
    { name: '프로젝트', options: ['프로젝트 연혁', '프로젝트 현황', '프로젝트 관리'] },
    { name: '커뮤니티', options: ['게시판', '게시판 관리'] },
  ];

  const pageMapping = {
    '조직도': 'organization_chart',
    '사원관리': 'employee_management',
    '프로젝트 연혁': 'project_hisorty',
    '프로젝트 현황': 'project_status',
    '프로젝트 관리': 'project_management',
    '게시판': 'board',
    '게시판 관리': 'board_management'
  };

  function handlePageNavigation(categoryName, option) {
    if (option !== '조직도' && option !== '프로젝트 연혁' && logStatus === false) {
      const userConfirmed = window.confirm('로그인이 필요합니다.\n로그인 하시겠습니까?');
      if (userConfirmed) {
        PageRoad('login');
        return;
      } else {
        return;
      }
    }
    if (['사원관리', '프로젝트 관리', '게시판 관리'].includes(option) && loginRank > 0) {
      alert('접근 권한이 없습니다');
      return;
    }
    if (option === '게시판') {
      {/* 25_01_24 (L.s.m) 여기 추가, 수정 */ }
      // setBoardCategory('');
      //sessionStorage.removeItem('category'); // 기존 카테고리 세션 제거
      sessionStorage.setItem('category', '전체');
      setBoardCategory('전체'); // 상태 초기화
      // PageRoad('board');
    }
    sessionStorage.setItem('text', categoryName + " (" + option + ")");
    PageRoad(pageMapping[option]);
  };

  function ScrollToTopButton() {
    // 최상단으로 스크롤 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  // 카테고리 선택 처리 함수
  function handleCategorySelect(categoryName) {
    {/* 25_01_24 (L.s.m) 여기 추가 */ }
    sessionStorage.setItem('category', categoryName);
    setBoardCategory(categoryName);
    // setSearchWord(''); // 검색어 초기화
  }
  return (
    <div id='company_site'>
      <div id='main_top_box'>
        <div id='company_logo'><img id='logo' src={logo} alt='company_logo.png' onClick={() => PageRoad('main')}></img></div>
        <div id='login_box'>
          <div>
            {logStatus ? <button className='login_button' onClick={logout}>로그아웃</button> : <button className='login_button' onClick={() => PageRoad('login')}>로그인</button>}
            {logStatus ? <Link to="/mypage"><button>마이페이지</button></Link> : ""}
          </div>
          {logStatus ?
            <>이름 : {loginName} <br />
              직급 : {loginPosition}</> : ""}
        </div>
        {/* <button id='main_button' className={page === 'main' ? 'active-button' : ''} onClick={() => PageRoad('main')}>메인 페이지</button>&nbsp;
        <button id='organization_chart_button' onClick={() => PageRoad('organization_chart')}>조직도</button>&nbsp;
        {loginRank <= 2 && <button id='collaborative_project_button' onClick={() => PageRoad('project_status')}>프로젝트 현황</button>} &nbsp;
        {loginRank <= 2 && <button id='board_button' onClick={() => PageRoad('board')}>게시판</button>} &nbsp;
        {loginRank <= 0 && <button id='employee_management_button' onClick={() => PageRoad('employee_management')}>사원관리</button>} &nbsp;
        {loginRank <= 0 && <button id='project_management_button' onClick={() => PageRoad('project_management')}>프로젝트 관리</button>} &nbsp;
        {loginRank <= 0 && <button id='board_management_button' onClick={() => PageRoad('board_management')}>게시판 관리</button>} &nbsp; */}

        <div id="main_category_box">
          {categories.map((category, index) => (
            <div key={index} className="main_category"
              onMouseEnter={() => setHoveredCategory(index)} // 마우스를 올리면 드롭다운 활성화
              onMouseLeave={() => setHoveredCategory(null)} // 마우스를 떼면 드롭다운 비활성화
            >
              {category.name}
              <div className={`dropdown_menu ${hoveredCategory === index ? 'visible' : ''}`}>
                {category.options.map((option, i) => (
                  <div key={i} className="dropdown_option" onClick={() => { handlePageNavigation(category.name, option) }}>{option}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {sessionStorage.getItem('text') !== null && page !== 'main' && page !== 'login' ? <div><h3 style={{ marginLeft: '30px' }}>{sessionStorage.getItem('text')}</h3> <hr /></div> : null}
      <div id='main_bottom_box'>
        {'login' === page && <LoginPage onLogin={handleLogin} mainPageRoad={refreshPage} />}
        {'main' === page &&
          <div>
            <div id='banner_box'><a href="https://heroes.nexon.com/promotion/2025/0116/update"><img id='banner' src={banner_1} alt='company_banner.jpg'></img></a></div>
            <div id='banner_box'><a href="https://bluearchive.nexon.com/events/2024/10/minigame"><img id='banner' src={banner_2} alt='company_banner.jpg'></img></a></div>
          </div>
        }
        {'project_hisorty' === page && <ProjectHistoryPage />}
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank} />}
        {'project_status' === page && <ProjectManagement loginRank={loginRank} />}
        {'project_management' === page && <ProjectManagement loginRank={loginRank} />}
        {'employee_management' === page && <EmployeeManagement />}
        {/* {'board' === page && <Board page={BoardPageRoad} readPage={readPageNo} />} */}
        {'board' === page && <Board page={PageRoad} readPage={readPageNo} handleCategorySelect={handleCategorySelect} selectedCategory={boardCategory} loginRank={loginRank} />}{/* 25_01_24 (L.s.m) 여기수정 */}
        {/* {'board_getList' === page && <BoardGetList category={boardCategory} page={PageRoad} readPage={readPageNo} loginRank={loginRank} />} ★여기수정 */}
        {'board_write' === page && <BoardWrite loginId={loginId} loginName={loginName} category={boardCategory} page={BoardPageRoad} />}
        {'board_read' === page && <BoardRead loginId={loginId} loginName={loginName} postNo={postNo} adAc={adminAccess} page={BoardPageRoad} readPage={readPageNo} />}
        {'board_modify' === page && <BoardModify postNo={postNo} readPage={readPageNo} />}
        {'board_management' === page && <BoardManagement readPage={readPageNo} />}
      </div>
      <img id='scroll_to_top_button' src={scrollToTopButton} alt='scrollToTopButton.png' onClick={ScrollToTopButton}></img>
    </div>
  );
}
export default App;
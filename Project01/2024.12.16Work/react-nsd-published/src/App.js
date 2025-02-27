import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import OrganizationChart from './pages/OrganizationChart';
import ProjectHistoryPage from './pages/projectHistoryPage';
import ProjectManagement from './pages/ProjectManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Board from './board/Board';
import BoardWrite from './board/BoardWrite';
import BoardRead from './board/BoardRead';
import BoardModify from './board/BoardModify';
import BoardManagement from './board/BoardManagement';
import { Link, useNavigate } from 'react-router-dom'; // 추가
import logo from './images/logo.png';
import scrollToTopButton from './images/sc.png';
import Footer from './utilPages/Footer';
import FinishedProjectList from './pages/FinishedProjectList';
import AutoPlay from './utilPages/AutoPlay';
import photo1 from './utilPages/photo1.png'
import photo2 from './utilPages/photo2.png'
import photo3 from './utilPages/photo3.png'
import photo4 from './utilPages/photo4.png'
import photo5 from './utilPages/photo5.png'
import photo6 from './utilPages/photo6.png'
import photo7 from './utilPages/photo7.png'
import photo8 from './utilPages/photo8.png'
import ProjectProfile from './utilPages/ProjectProfile';
import adminImg from './images/admin_page.png';
import LocalUrl from './LocalUrl';

function App() {
  const [page, setPage] = useState(''); // 상위 페이지 로드 
  const [logStatus, setLogStatus] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginName, setloginName] = useState(null);
  const [loginRank, setLoginRank] = useState(3);
  const [boardCategory, setBoardCategory] = useState(''); // 게시판 카테고리 페이지 로드 
  const [postNo, setPostNo] = useState(0);  // 게시판 글 읽기 페이지 로드
  const [admin, setAdmin] = useState(JSON.parse(sessionStorage.getItem('isAdmin')));
  const [showLoginDropdown, setShowLoginDropdown] = useState(false); //로그인 드롭다운
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate(); // 추가

  useEffect(() => {
    handleLogin();
    refreshPage();
  }, []);

  function adminModeSelect() {
    if (admin) {
      setAdmin(false);
      sessionStorage.setItem('isAdmin', JSON.stringify(false));
    } else {
      setAdmin(true);
      sessionStorage.setItem('isAdmin', JSON.stringify(true));
    }
    PageRoad('main');
  }

  function PageRoad(p) { // 페이지 로드 처리 로직
    sessionStorage.setItem('page', p);
    refreshPage();
    // if (p === 'main') {
    //   sessionStorage.clear(); // 메인 페이지 이동 시 전체 세션 클리어
    //   console.log('sessionStorage 초기화 됨');
    // }
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
    axios.get(`${LocalUrl()}/company/loginInfo`, { withCredentials: true })
      .then(response => {
        const loginInfo = response.data;
        setLoginId(loginInfo.company_id);
        setloginName(loginInfo.company_name);
        setLoginRank(loginInfo.position_rank);
        setProfilePhoto(loginInfo.profile_photo);
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
    axios.get(`${LocalUrl()}/company/logout`, { withCredentials: true })
      .then(() => {
        // 명시적으로 상태 초기화
        setLogStatus(false);
        setLoginId(null);
        setloginName(null);
        setLoginRank(3);
        setAdmin(false);

        // 세션 초기화
        sessionStorage.clear();
        sessionStorage.setItem('page', 'main');

        // 드롭다운 메뉴 닫기 추가
        setShowLoginDropdown(false);

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
      sessionStorage.setItem('adminAccess', 'adac');
    } else {
      sessionStorage.removeItem('adminAccess');
    }
    PageRoad(p);
  }

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categories = [
    // { name: '부서', options: ['조직도', '사원관리'] },
    // { name: '프로젝트', options: ['프로젝트 연혁', '프로젝트 현황', '프로젝트 관리'] },
    { name: '부서', options: ['조직도', '구성원 정보', '업무 분장'] },
    // { name: '프로젝트', options: ['프로젝트 연혁', '프로젝트 현황', '마감된 프로젝트'] },
    { name: '프로젝트', options: ['진행중인 프로젝트', '마감된 프로젝트', '프로젝트 일정관리'] },
    { name: '커뮤니티', options: ['게시판', '질문 및 답변', '칭찬 & 감사 게시판'] },
    { name: '관리자 모드', options: ['사원 관리', '프로젝트 관리', '게시판 관리'] }
  ];

  const pageMapping = {
    '조직도': 'organization_chart',
    '구성원 정보': 'employee_info', // 구성원 정보 더미 매핑 (실제 기능 x)
    '업무 분장': 'employee_task', // 업무 분장 더미 매핑 (실제 기능 x)
    '사원 관리': 'employee_management',
    // '프로젝트 연혁': 'project_hisorty',
    '진행중인 프로젝트': 'project_status',
    '마감된 프로젝트': 'finished_project_list',
    '프로젝트 일정관리': 'project_schedule', // 프로젝트 일정관리 더미 매핑 (실제 기능 x)
    '프로젝트 관리': 'project_management',
    '게시판': 'board',
    '질문 및 답변': 'qna_board', // 질문 및 답변 더미 매핑 (실제 기능 x)
    '칭찬 & 감사 게시판': 'shoutout_board', // 칭찬 & 감사 게시판 더미 매핑 (실제 기능 x)
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
    // 프로젝트 일정관리, 업무 분장, 구성원 정보, 질문 및 답변, 칭찬 & 감사 게시판 클릭 시 alert
    if (option === '프로젝트 일정관리' || option === '업무 분장' || option === '구성원 정보' || option === '질문 및 답변' || option === '칭찬 & 감사 게시판') {
      navigate('/developing');
      return;
    }
    if (option === '게시판') {
      //* 25_01_24 (L.s.m) 여기 추가, 수정 
      // setBoardCategory('');
      //sessionStorage.removeItem('category'); // 기존 카테고리 세션 제거
      sessionStorage.setItem('category', '전체');
      setBoardCategory('전체'); // 상태 초기화
      // PageRoad('board');
    }
    sessionStorage.setItem('text', categoryName + " (" + option + ")");
    PageRoad(pageMapping[option]);
    // 페이지 이동 시 로그인 드롭다운 닫기
    setShowLoginDropdown(false);
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
    sessionStorage.setItem('category', categoryName);
    setBoardCategory(categoryName);
    // setSearchWord(''); // 검색어 초기화
  }
  // 로그인 드롭다운 처리 함수
  function handleLoginDropdownClick() {
    setShowLoginDropdown(!showLoginDropdown);
  }

  const getProfilePhoto = (photo) => {
    const photoMapping = {
      "1": photo1,
      "2": photo2,
      "3": photo3,
      "4": photo4,
      "5": photo5,
      "6": photo6,
      "7": photo7,
      "8": photo8
    };
    return photoMapping[photo] || photo1; // 기본값으로 photo1 사용
  };

  const profilePhotoURL = getProfilePhoto(profilePhoto);

  return (
    <div id={!admin ? 'company_site_user' : 'company_site_admin'}>
      <div id='main_top_box'>
        <div id='company_logo'><img id='logo' src={logo} alt='company_logo.png' onClick={() => PageRoad('main')}></img></div>
        {/* 로그인 UI */}
        <div id="login_box">
          {logStatus ? (
            <div className="dropdown_a">
              {/* 로그인한 아이디 끝에 '님' 추가 */}
              <div id='main_image_login'>
                <img src={profilePhotoURL} alt="프로필 사진" className="login_profile-img" />
                <span className="login_text" onClick={handleLoginDropdownClick}>

                  {loginName}님
                  {showLoginDropdown ? '▲' : '▼'}
                </span>
              </div>
              {showLoginDropdown && (
                <div className="dropdown_a_menu">
                  <Link id='no-underline' to="/mypage">
                    <div className="dropdown_a_option">마이페이지</div>
                  </Link>
                  <div className="dropdown_a_option" onClick={logout}>로그아웃</div>
                  {/* //김도 테스트임 나중에 지움 */}
                  {loginId === 'admin' ? <button id='admin_button' onClick={adminModeSelect}>{admin ? '일반' : '관리'}</button> : null}
                  {/* {loginId === 'admin' ? <div onClick={adminModeSelect}>{admin ? '일반' : '관리'}</div> : null} */}
                </div>
              )}
            </div>
          ) : (
            <span className="login_text" onClick={() => PageRoad('login')}>Login</span>
          )}
        </div>

        {admin ?
          <div>
            {categories
              .filter(category => category.name === '관리자 모드')
              .map((category, index) => (
                <div key={index} id="admin_category_box">
                  {category.options.map((option, i) => (<div key={i} className="admin_option" onClick={() => { handlePageNavigation(category.name, option) }}>{option}</div>))}
                </div>
              ))
            }
          </div> :
          <div id="main_category_box">
            {categories
              .filter(category => !(!admin && category.name === '관리자 모드'))
              .map((category, index) => (
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
              ))
            }
          </div>
        }
      </div>
      <hr />
      {sessionStorage.getItem('text') !== null && page !== 'main' && page !== 'login' ? <div><h3 style={{ marginLeft: '30px' }}>{sessionStorage.getItem('text')}</h3> <hr /></div> : null}
      <div id='main_bottom_box'>
        {'login' === page && <LoginPage onLogin={handleLogin} mainPageRoad={refreshPage} />}
        {page === 'main' && (
          !admin ? (
            <div id="main_page_box">
              <AutoPlay />
              <ProjectProfile />
            </div>
          ) : (
            <div id="main_bottom_box_ad">
              <img src={adminImg} alt="관리" id="adminImg" />
              관리자 페이지 입니다.
            </div>
          )
        )}
        {'project_hisorty' === page && <ProjectHistoryPage />}
        {'organization_chart' === page && <OrganizationChart loginRank={loginRank} />}
        {/* 변경점 */}
        {'project_status' === page && <ProjectManagement loginId={loginId} adminModeSelect={admin} />}
        {'project_management' === page && <ProjectManagement loginId={loginId} adminModeSelect={admin} />}
        {'employee_management' === page && <EmployeeManagement />}
        {'finished_project_list' === page && <FinishedProjectList loginRank={loginRank} LoginID={loginId} />}
        {/* 25_01_24 (L.s.m) 여기수정 */}
        {'board' === page && <Board page={PageRoad} readPage={readPageNo} handleCategorySelect={handleCategorySelect} selectedCategory={boardCategory} loginRank={loginRank} />}
        {'board_write' === page && <BoardWrite loginId={loginId} loginName={loginName} category={boardCategory} page={BoardPageRoad} />}
        {'board_read' === page && <BoardRead loginId={loginId} loginName={loginName} postNo={postNo} page={BoardPageRoad} readPage={readPageNo} />}
        {'board_modify' === page && <BoardModify postNo={postNo} readPage={readPageNo} />}
        {'board_management' === page && <BoardManagement readPage={readPageNo} />}
      </div>
      <img id='scroll_to_top_button' src={scrollToTopButton} alt='scrollToTopButton.png' onClick={ScrollToTopButton}></img>
      {!admin ? <Footer /> : null}
    </div>
  );
}
export default App;
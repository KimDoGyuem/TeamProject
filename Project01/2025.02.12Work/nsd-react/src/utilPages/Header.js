import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import logout_image from '../images/logout_white.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header({ loginName, loginPosition }) {
    const navigate = useNavigate();

    function logout() {
        axios.get('http://localhost:8080/spring/company/logout', { withCredentials: true })
        .then(() => {
            sessionStorage.clear();
            sessionStorage.setItem('page', 'main');
            navigate('/'); // 메인 페이지로 이동
        })
        .catch(error => {
            console.error('에러2!', error);
        })
    }

    return (
        <div id='main_top_box'>
            <div id='company_logo'>
                <Link to='/' onClick={() => sessionStorage.setItem('page', 'main')}>
                    <img id='logo' src={logo} alt='company_logo.png' />
                </Link>
            </div>
            <div id='login_box'>
                <div id='mypage_logout_box'>
                <img id='logout_image' src={logout_image} alt='logout_white.png' />
                    <div className='mypage_logout_button' onClick={logout}>로그아웃</div>
                    {/* <Link to="/mypage"><button>마이페이지</button></Link> */}
                </div>
            </div>
        </div>
    );
}

export default Header;


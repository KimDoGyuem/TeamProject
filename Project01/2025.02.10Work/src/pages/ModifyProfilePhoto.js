import { useEffect, useState } from 'react';
import './Pages.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import photo1 from '../utilPages/photo1.png'
import photo2 from '../utilPages/photo2.png'
import photo3 from '../utilPages/photo3.png'
import photo4 from '../utilPages/photo4.png'
import photo5 from '../utilPages/photo5.png'
import Header from '../utilPages/Header';

function ModifyProfilePhoto() {
    const [loginId, setLoginId] = useState(null);
    const [loginName, setloginName] = useState(null);
    const [loginRank, setLoginRank] = useState(3);
    const [loginPosition, setLoginPosition] = useState('');
    const [modifyPP, setModifyPP] = useState(null);

    const navigate = useNavigate(); // useNavigate 훅 사용
    useEffect(() => {
        handleLogin();
    }, []);

    function handleLogin() {
        axios.get('http://localhost:8080/spring/company/loginInfo', { withCredentials: true })
        .then(response => {
            const loginInfo = response.data;
            setLoginId(loginInfo.company_id);
            setloginName(loginInfo.company_name);
            setLoginRank(loginInfo.position_rank);
            setLoginPosition(loginInfo.position);
        })
        .catch(error => {
            console.error('에러!', error);
        })
    }

    function changePP() {
        let body = {company_id : loginId, profile_photo : modifyPP};
        axios.post('http://localhost:8080/spring/company/modifyMyPP', body)
        .then(() => {
            alert("변경되었습니다.");
            navigate('/mypage', {replace:true});
        })
        .catch(error => {
            console.error("에러! : ", error);
        })
    }

    const handleChange = (e) => {
        setModifyPP(e.target.value);
    }

    return (
        <div id='company_site'>
            <Header loginName={loginName} loginPosition={loginPosition} />
            <div id='mypage_main_box'>
                <fieldset className='profile-photo-fieldset'>
                    <legend>프로필 사진 선택</legend>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        changePP();
                    }}>
                        <div className='photo-options'>
                            {[
                                { id: "1", src: photo1 },
                                { id: "2", src: photo2 },
                                { id: "3", src: photo3 },
                                { id: "4", src: photo4 },
                                { id: "5", src: photo5 }
                            ].map((photo) => (
                                <div key={photo.id} className='photo-option'>
                                    <input 
                                        type="radio" 
                                        id={`option${photo.id}`} 
                                        name="option" 
                                        value={photo.id} 
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`option${photo.id}`}>
                                        <img src={photo.src} alt={`프로필 ${photo.id}`} />
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='profile-photo-submit-button'>
                            <input type="submit" value="변경" />
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default ModifyProfilePhoto;
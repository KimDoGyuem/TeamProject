import { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';

function BoardModify({ postNo, readPage }) {

    const [post, setPost] = useState({ cb_title: '', cb_text: '' });

    useEffect(() => {
        axiosGetRead();
    }, []);

    function axiosGetRead() {
        axios.get(`http://localhost:8080/spring/companyBoard/read?postNo=${postNo}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosModifyPost(e) {
        e.preventDefault();
        let body = { cb_no: post.cb_no, cb_title: post.cb_title, cb_text: post.cb_text };
        axios.post('http://localhost:8080/spring/companyBoard/modifyPost', body)
            .then(() => {
                readPage('board_read', postNo);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function handleChange(e) {
        const { name, value } = e.target; // input의 name과 value 가져오기
        setPost(prevPost => ({
            ...prevPost, //이전 Post 객체 복사
            [name]: value // 계산된 속성 이름(Computed Property Name) 문법, ex) cd_title: 입력 값
        }));
    }

    return (
        <div id='board_modify_page'>
            <div id='modify_box'>
                <h2 style={{ marginLeft: '30px' }}>글수정</h2>
                <div id='form_area_box'>
                    <div>
                        <br />
                        <h4>{post.cb_category} 게시판</h4>
                        <hr />
                        <form onSubmit={axiosModifyPost}>
                            <input style={{ width: '1000px', height: '50px' }} name='cb_title' value={post.cb_title} onChange={handleChange}></input> <br/><br/><br/>
                            <textarea style={{ width: '1000px', height: '500px' }} name='cb_text' value={post.cb_text} onChange={handleChange}></textarea> <br/><br/>
                            <button id='registration_button' type='submit'>수정</button> &nbsp;
                            <button id='cancell_button' onClick={() => readPage('board_read', postNo)}>취소</button>
                        </form>
                        <br/><br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardModify;
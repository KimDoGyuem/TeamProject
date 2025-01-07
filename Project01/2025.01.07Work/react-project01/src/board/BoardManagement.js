import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';

function BoardManagement() {

    const [allPosts, setAllPosts] = useState([]);
    const [selectPosts, setSelectPosts] = useState([]);
    const [searchTag, setSearchTag] = useState('cb_title');
    const [searchWord, setSearchWord] = useState('');
    const [del, setDel] = useState(false);

    useEffect(() => {
        axiosGetAllPostList();
    }, [del]);

    function axiosGetAllPostList() {
        axios.get(`http://localhost:8080/spring/companyBoard/getAllPostList?searchTag=${searchTag}&searchWord=${searchWord}&del=${del}`)
            .then((response) => {
                setAllPosts(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function checkBoxSelect(no) {
        setSelectPosts((prevSelected) => {  // 화살표 함수 사용
            if (prevSelected.includes(no)) {  // includes는 배열에 no가 존재하는지 확인하는 함수(존재 할 경우 true)
                return prevSelected.filter((i) => i !== no);    // 배열에서 no를 지운 새로운 배열 리턴
            } else {
                return [...prevSelected, no];   // 배열에 no가 없을 경우 기존배열을 복사하여 no를 추가
            }
        });
    }

    function recoverPost() {
        if (selectPosts.length === 0) {
            alert('선택된 글이 없습니다');
            return;
        }
        axios.post('http://localhost:8080/spring/companyBoard/recoverPost', { postNos: selectPosts }) //  키(key)는 'postNOs'이고 값(value)은 selectPosts배열을 담은 객체형태로 보냄
            .then(() => {
                setSelectPosts([]); // 선택 초기화 
                axiosGetAllPostList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function search(e) {
        e.preventDefault();
        axiosGetAllPostList();
    }

    function allView(){
        setDel(false);
        setSearchWord('');
        axiosGetAllPostList();
    }
    
    function delView(){
        setDel(true);
        setSearchWord('');
        axiosGetAllPostList();
    }

    return (
        <div id='board_management_page'>
            <div id='management_box'>
                {/* <form onSubmit={search}> */}
                <h3>게시판 관리</h3>
                <table style={{ width: '1270px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '8%', height: '30px' }}>글번호</td>
                            <td style={{ width: '8%' }}>카테고리</td>
                            <td style={{ width: '50%' }}>글제목</td>
                            <td style={{ width: '8%' }}>작성자</td>
                            <td style={{ width: '13%' }}>작성일</td>
                            <td style={{ width: '5%' }}>조회수</td>
                            <td style={{ width: '5%' }}>상태</td>
                            <td style={{ width: '3%' }}>all</td>
                        </tr>
                        {allPosts.map((p, i) =>
                            <tr key={i}>
                                <td style={{ width: '8%', height: '30px' }}>{p.cb_no}</td>
                                <td style={{ width: '8%' }}>{p.cb_category}</td>
                                <td style={{ width: '50%' }}>{p.cb_title}</td>
                                <td style={{ width: '8%' }}>{p.company_name}</td>
                                <td style={{ width: '13%' }}>{p.formattedDate}</td>
                                <td style={{ width: '5%' }}>{p.cb_hits}</td>
                                <td style={{ width: '5%' }}>{p.cb_is_deleted ? <span style={{ color: 'tomato' }}>삭제</span> : <span>게시</span>}</td>
                                <td style={{ width: '3%' }}>
                                    <input type='checkbox' checked={selectPosts.includes(p.cb_no)} onChange={() => checkBoxSelect(p.cb_no)}></input>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <hr />
                페이징블럭 영역
                <hr />
                <button onClick={allView}>전체 글 보기</button>
                <button onClick={delView}>삭제 글 보기</button>
                <button >선택 글 삭제</button>
                {del === true && <button onClick={recoverPost}>선택 글 복구</button>}
                <hr />
                <form onSubmit={search}>
                    <select onChange={(e) => setSearchTag(e.target.value)}>
                        <option value='cb_title'>글제목</option>
                        <option value='company_name'>작성자</option>
                    </select>
                    <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} placeholder='검색어를 입력 해주세요'></input>
                    <button type='submit'>검색</button>
                </form>
            </div>
        </div>
    );
}

export default BoardManagement;
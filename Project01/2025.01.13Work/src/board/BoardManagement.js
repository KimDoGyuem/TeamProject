import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';
import Pagenation from '../utilPages/Pagination';

function BoardManagement({readPage}) {

    const [allPosts, setAllPosts] = useState([]);
    const [selectPosts, setSelectPosts] = useState([]);
    const [searchTag, setSearchTag] = useState('cb_title');
    const [searchWord, setSearchWord] = useState('');
    const [del, setDel] = useState(false);

    const [currentBlock, setCurrentBlock] = useState(1); // 현재 블록 번호
    const [currentPage, setCurrentPage] = useState(1);  //현재 페이지 번호
    const postsPerPage = 10; // 페이지당 게시물 수
    const blockSize = 3; // 한 블록에 표시할 페이지 수
    const indexOfLastPost = currentPage * postsPerPage; //현재 블록 기준 페이지 끝번호 계산식(시작 인덱스)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 블록 기준 페이지 첫번호 계산식(종료 인덱스)
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost); //slice함수: 기존 배열에서 특정 부분을 추출하여 새 배열을 반환
    const totalPages = Math.ceil(allPosts.length / postsPerPage);   //총 페이지 수 계산

    useEffect(() => {
        axiosGetAllPostList();
    }, [del]);

    function axiosGetAllPostList() {
        axios.get(`http://localhost:8080/spring/companyBoard/getAllPostList?searchTag=${searchTag}&searchWord=${searchWord}&del=${del}`)
            .then((response) => {
                setAllPosts(response.data);
                setSearchWord('');
                setCurrentPage(1);
                setCurrentBlock(1);
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

    function dataBaseDelPost() {    // 글 삭제시 해당 글에 달린 댓글 까지 전부 DB에서 삭제처리

        //삭제 확인 창 표시
        const userConfirmed = window.confirm('정말 삭제하시겠습니까?'); //userConfirmed는 처음에는 undefined인 상태임
        if (!userConfirmed){
            //사용자가 취소를 누르면 함수 종료
            return;
        }

        if (selectPosts.length === 0) {
            alert('선택된 글이 없습니다');
        }
        axios.post('http://localhost:8080/spring/companyBoard/dataBaseDelPost', { postNos: selectPosts })
            .then(() => {
                setSelectPosts([]);
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

    //01-13 수정됨 
    function allView() {
        setDel(false);
        setSelectPosts([]);
        axiosGetAllPostList();
    }

    function delView() {
        setDel(true);
        setSelectPosts([]);
        axiosGetAllPostList();
    }

    // 페이지에 표시 되는 글의 개수(allPosts.length)가 0보다 크고, 표시된 글들의 번호와 내가 선택한 글의 번호가 전부 일치 할 경우(전체선택) isAllSelected 는 true 가 된다, 아니면 false 가 된다
    // every함수는 배열의 모든 요소가 충족 하는지 확인 하는 배열 메서드이다, post => selectPosts.includes(post.cb_no) 이런 식으로 콜백 함수를 사용하여야 한다
    const isAllSelected = allPosts.length > 0 && allPosts.every(post => selectPosts.includes(post.cb_no)); 

    // 전체 선택/해제 처리
    function handleSelectAll() {
        if (isAllSelected) {   
            //밑에 두 코드는 현재 페이지 에서만 선택 해제 되는 코드임 (필요하려나?)
            // const newSelected = selectPosts.filter(cb_no => !allPosts.some(post => post.cb_no === cb_no));
            // setSelectPosts(newSelected);
            setSelectPosts([]);
        } else {
            // 복사된 selectPosts배열에 복사된 allPosts배열을 병합 한 후 ...new Set으로 중복 요소를 제거 한 수 새로운 배열로 만듬
            // Set은 중복 없는 요소를 저장하는 js의 내장 객체임, ...new Set으로 사용하는 이유는 Set은 배열이 아닌 객체이기 때문에 최종 결과물을 배열로 만들기 위함임
            const newSelected = [...new Set([...selectPosts, ...allPosts.map(post => post.cb_no)])];
            setSelectPosts(newSelected);
        }
    }
    
    function read(no){
        readPage('board_read', no);
    }
    

    return (
        <div id='board_management_page'>
            <div id='management_box'>
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
                            <td style={{ width: '3%' }}>
                                <input type='checkbox' checked={isAllSelected} onChange={handleSelectAll}/>
                            </td>
                        </tr>
                        {currentPosts.map((p, i) =>
                            <tr key={i}>
                                <td style={{ width: '8%', height: '30px' }}>{p.cb_no}</td>
                                <td style={{ width: '8%' }}>{p.cb_category}</td>
                                <td id='post_title_link' style={{ width: '50%' }} onClick={() => read(p.cb_no)}>{p.cb_title}</td>
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
                <Pagenation currentPage={currentPage} totalPages={totalPages} blockSize={blockSize} onPageChange={setCurrentPage} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
                <hr />
                <button onClick={allView}>전체 글 보기</button>
                <button onClick={delView}>삭제 글 보기</button>
                <button onClick={dataBaseDelPost}>선택 글 삭제</button>
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
import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';
import highlightText from '../utilPages/HighLightText';
import Pagenation from '../utilPages/Pagination';

function BoardGetList({ category, page, readPage, loginRank }) {    

    const [posts, setPost] = useState([]);
    const [searchTag, setSearchTag] = useState('cb_title');
    const [tempSearchTag, setTempSearchTag] = useState('cb_title');
    const [searchWord, setSearchWord] = useState('');
    const [tempSearchWord, setTempSearchWord] = useState('');
    //조회수 정렬 상태 관리
    const [isHitsSorted, setIsHitsSorted] = useState(false);

    const shouldShowButton = !(category === '전체' || (category === '공지' && loginRank > 0));
    
    useEffect(() => {
        axiosGetPostList();
    }, [category, searchWord, searchTag]);

    useEffect(() => {
        setSearchWord(''); // 카테고리 변경 시 검색어 초기화
        setTempSearchWord(''); // tempSearchWord도 초기화
    }, [category]); // 카테고리가 변경될 때마다 실행

    function axiosGetPostList() {
        axios.get(`http://localhost:8080/spring/companyBoard/getPostList?category=${category}&searchTag=${searchTag}&searchWord=${searchWord}`)
            .then((response) => {
                setPost(response.data);
                setCurrentPage(1);
                setCurrentBlock(1);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function read(no) {
        axios.get(`http://localhost:8080/spring/companyBoard/hitsUp?no=${no}`)
            .then(() => {
                readPage('board_read', no)
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function search(e) {
        e.preventDefault();
        setSearchWord(tempSearchWord);
        setSearchTag(tempSearchTag);
    }

    //조회수 정렬 함수
    function handleSortByHits() {
        const sortedPosts = [...posts].sort((a, b) => //sort는 배열 정렬 메서드
            (isHitsSorted ? b.cb_hits - a.cb_hits : a.cb_hits - b.cb_hits));
        setPost(sortedPosts);
        setIsHitsSorted(!isHitsSorted); //정렬 상태 반전
    }

    //날짜 YYYY-MM-DD 형식으로 변환
    function formatDate(dateString) {
        const date = new Date(dateString); // 문자열을 Date 객체로 변환
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식으로 반환
    }

    //페이징 블럭 변수 모음 ~~~~~
    const [currentPage, setCurrentPage] = useState(1);  //현재 페이지 번호
    const [currentBlock, setCurrentBlock] = useState(1); // 현재 블록 번호
    const postsPerPage = 10; // 페이지당 게시물 수
    const blockSize = 3; // 한 블록에 표시할 페이지 수
    const indexOfLastPost = currentPage * postsPerPage; //현재 블록 기준 페이지 끝번호 계산식(시작 인덱스)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 블록 기준 페이지 첫번호 계산식(종료 인덱스)
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //slice함수: 기존 배열에서 특정 부분을 추출하여 새 배열을 반환. 원본 배열은 수정되지 않음 
    const totalPages = Math.ceil(posts.length / postsPerPage);  //총 페이지 수 계산
    //~~~~~여기까지

    return (
        <div id='board_get_list_page'>
            <div id='list_box'>
                <h3>{category} 게시판</h3>    
                <table id='getlist_table'>
                    <tbody>
                        <tr>
                            <td className='td_a' style={{ width: '10%', height: '30px' }}>글번호</td>
                            <td className='td_a' style={{ width: '55%' }}>글제목</td>
                            <td className='td_a' style={{ width: '14%' }}>작성자</td>
                            <td className='td_a' style={{ width: '14%' }}>작성일</td>
                            <td className='td_a' style={{ width: '7%' }}>조회수<span onClick={handleSortByHits} style={{ cursor: 'pointer', fontSize: '20px' }}>
                                {isHitsSorted ? '▴' : '▾'}
                            </span></td>
                        </tr>
                        {currentPosts.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '100px' }}>등록된 게시글이 없습니다.</td>
                            </tr>
                        ) : (
                            currentPosts.map((p, i) => (
                                <tr key={i}>
                                    <td className='td_b' style={{ width: '10%', height: '30px' }}>{p.cb_no}</td>
                                    <td className='td_b' id='post_title_link' style={{ width: '55%' }} onClick={() => read(p.cb_no)}>{highlightText(p.cb_title, searchWord)}</td>
                                    <td className='td_b' style={{ width: '14%' }}>{p.company_name}</td>
                                    {p.formattedDate === p.formattedModifyDate ?
                                        <td className='td_b' style={{ width: '14%' }}>{formatDate(p.formattedDate)}</td> :
                                        <td className='td_b' style={{ width: '14%' }}>{formatDate(p.formattedModifyDate)}</td>
                                    }
                                    <td className='td_b' style={{ width: '7%' }}>{p.cb_hits}</td>
                                </tr>
                            ))
                            )}
                    </tbody>
                </table>
                <hr />

                {/* 페이징 블럭 ~~~~~*/}
                <Pagenation currentPage={currentPage} totalPages={totalPages} blockSize={blockSize} onPageChange={setCurrentPage} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
                {/* ~~~~~여기까지 */}

                <hr />
                {/* <button id='main_button' onClick={() => page('board')}>메인으로</button> &nbsp; */} {/*안쓰는 버튼 */}
                {/* <button id='main_button' onClick={() => page('board_write')}>글쓰기</button>     */}
                {shouldShowButton && <button id='main_button' onClick={() => page('board_write')}>글쓰기</button>} 
                <hr />
                <select id='getlist_form_select' onChange={(e) => setTempSearchTag(e.target.value)}>
                    <option value='cb_title'>글제목</option>
                    <option value='cb_text'>글내용</option>
                    <option value='company_name'>작성자</option>
                </select>
                <form id='getlist_form' onSubmit={search}>
                    <input className='getlist_form_input' value={tempSearchWord} onChange={(e) => setTempSearchWord(e.target.value)} placeholder='검색어를 입력 해주세요'></input>
                    <button className='getlist_form_button' type='submit'>검색</button>
                </form>
            </div>
        </div>
    );
}

export default BoardGetList;
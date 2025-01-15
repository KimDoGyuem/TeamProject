import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';
import highlightText from '../utilPages/HighLightText';
import Pagenation from '../utilPages/Pagination';

function BoardGetList({ category, page, readPage }) {  

    const [posts, setPost] = useState([]);
    const [searchTag, setSearchTag] = useState('cb_title');
    const [tempSearchTag, setTempSearchTag] = useState('cb_title');
    const [searchWord, setSearchWord] = useState('');
    const [tempSearchWord, setTempSearchWord] = useState('');

    useEffect(() => {
        axiosGetPostList();
    }, [searchWord,searchTag]);

    //01-13수정됨(검색 시 페이징 관련 이슈)
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

    //날짜 YYYY-MM-DD 형식으로 변환
    function formatDate(dateString) {
        const date = new Date(dateString); // 문자열을 Date 객체로 변환
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식으로 반환
    }

    //페이징 블럭 변수 모음 ~~~~~
    const [currentPage, setCurrentPage] = useState(1);  //현재 페이지 번호
    const [currentBlock, setCurrentBlock] = useState(1); // 현재 블록 번호
    const postsPerPage = 5; // 페이지당 게시물 수
    const blockSize = 3; // 한 블록에 표시할 페이지 수
    const indexOfLastPost = currentPage * postsPerPage; //현재 블록 기준 페이지 끝번호 계산식(시작 인덱스)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 블록 기준 페이지 첫번호 계산식(종료 인덱스)
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //slice함수: 기존 배열에서 특정 부분을 추출하여 새 배열을 반환. 원본 배열은 수정되지 않음 
    const totalPages = Math.ceil(posts.length / postsPerPage);  //총 페이지 수 계산
    //~~~~~여기까지

    return (
        <div id='board_get_list_page'>
            <div id='list_box'>
                <h3>글 리스트</h3>
                <table style={{ width: '1270px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '10%', height: '30px' }}>글번호</td>
                            <td style={{ width: '55%' }}>글제목</td>
                            <td style={{ width: '15%' }}>작성자</td>
                            <td style={{ width: '15%' }}>작성일</td>
                            <td style={{ width: '5%' }}>조회수</td>
                        </tr>
                        {currentPosts.map((p, i) =>
                            <tr key={i}>
                                <td style={{ width: '10%', height: '30px' }}>{p.cb_no}</td>
                                <td id='post_title_link' style={{ width: '55%' }} onClick={() => read(p.cb_no)}>{highlightText(p.cb_title, searchWord)}</td>
                                <td style={{ width: '15%' }}>{p.company_name}</td>
                                <td style={{ width: '15%' }}>{formatDate(p.formattedDate)}</td>
                                <td style={{ width: '5%' }}>{p.cb_hits}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <hr />

                {/* 페이징 블럭 ~~~~~*/}
                <Pagenation currentPage={currentPage} totalPages={totalPages} blockSize={blockSize} onPageChange={setCurrentPage} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
                {/* ~~~~~여기까지 */}

                <hr />
                <button id='main_button' onClick={() => page('board')}>메인으로</button>
                <button id='main_button' onClick={() => page('board_write')}>글쓰기</button>
                <hr />
                <select onChange={(e) => setTempSearchTag(e.target.value)}>
                    <option value='cb_title'>글제목</option>
                    <option value='cb_text'>글내용</option>
                    <option value='company_name'>작성자</option>
                </select>
                <form onSubmit={search}>
                    <input value={tempSearchWord} onChange={(e) => setTempSearchWord(e.target.value)} placeholder='검색어를 입력 해주세요'></input>
                    <button type='submit'>검색</button>
                </form>
            </div>
        </div>
    );
}

export default BoardGetList;
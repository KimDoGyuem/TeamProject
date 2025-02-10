import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';
import Pagenation from '../utilPages/Pagination';
import highlightText from '../utilPages/HighLightText';
import deleteButton from '../images/delete_button.png';
import recoverButton from '../images/recover_button.png';

function BoardManagement({ readPage }) {

    const [allPosts, setAllPosts] = useState([]);
    const [selectPosts, setSelectPosts] = useState([]); // 체크박스 선택 한 글 번호 배열
    const [selectPostInfos, setSelectPostInfos] = useState([]); // 체크박스 선택 한 글 전체 정보 배열
    const [searchTag, setSearchTag] = useState('cb_title');
    const [tempSearchTag, setTempSearchTag] = useState('cb_title');
    const [searchWord, setSearchWord] = useState('');
    const [tempSearchWord, setTempSearchWord] = useState('');
    const [del, setDel] = useState(false);
    const [addCategory, setAddCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [selButton, setSelButton] = useState(true);
    const [period, setPeriod] = useState(null);

    const [currentBlock, setCurrentBlock] = useState(1); // 현재 블록 번호
    const [currentPage, setCurrentPage] = useState(1);  //현재 페이지 번호
    const postsPerPage = 10; // 페이지당 게시물 수
    const blockSize = 3; // 한 블록에 표시할 페이지 수
    const indexOfLastPost = currentPage * postsPerPage; //현재 블록 기준 페이지 끝번호 계산식(시작 인덱스)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 블록 기준 페이지 첫번호 계산식(종료 인덱스)
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost); //slice함수: 기존 배열에서 특정 부분을 추출하여 새 배열을 반환
    const totalPages = Math.ceil(allPosts.length / postsPerPage);   //총 페이지 수 계산

    //조회수 정렬 상태 관리 (soo)
    const [isHitsSorted, setIsHitsSorted] = useState(false);

    useEffect(() => {
        axiosGetAllPostList();
    }, [searchWord, searchTag, del, searchCategory]);

    useEffect(() => {
        axiosGetCategoryList();
        currentTrendingPeriod();
    }, []);

    function axiosGetAllPostList() {
        axios.get(`http://localhost:8080/spring/companyBoard/getAllPostList?searchTag=${searchTag}&searchWord=${searchWord}&del=${del}&searchCategory=${searchCategory}`)
            .then((response) => {
                setAllPosts(response.data);
                setCurrentPage(1);
                setCurrentBlock(1);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    //조회수 정렬 함수 (soo)
    function handleSortByHits() {
        const sortedPosts = [...allPosts].sort((a, b) => {
            return isHitsSorted ? b.cb_hits - a.cb_hits : a.cb_hits - b.cb_hits;
        });
        setAllPosts(sortedPosts);
        setIsHitsSorted(!isHitsSorted); //정렬 상태 반전
    }

    function checkBoxSelect(post) {
        const { cb_no } = post; //객체 구조 분해 할당 문법(post객체에서 cb_no 라는 속성만 꺼내서 변수 cb_no 에 담음)
        //선택 번호 배열 업데이트
        setSelectPosts((prevSelected) => {  // 화살표 함수 사용
            if (prevSelected.includes(cb_no)) {  // 배열에 cb_no가 존재하는지 확인하는 함수(존재 할 경우 true)
                return prevSelected.filter((i) => i !== cb_no);  // 배열에서 cb_no를 지운 새로운 배열 리턴
            } else {
                return [...prevSelected, cb_no];   // 배열에 cb_no가 없을 경우 기존배열을 복사하여 cb_no를 추가
            }
        });
        //선택 객체 정보 배열 업데이트 (글 복구 관련)
        setSelectPostInfos((prevSelected) => {
            if (prevSelected.some((p) => p.cb_no === cb_no)) {
                return prevSelected.filter((p) => p.cb_no !== cb_no);
            } else {
                return [...prevSelected, post];
            }
        })
    }

    function recoverPost() {
        const isCheckList = selectPostInfos.every((p) => p.cb_is_deleted);   //배열의 모든 요소가 특정 조건을 만족하는지 확인(배열의 각 요소 p 에서 cb_is_deleted 가 전부 true 인지 확인, 하나라도 false 일 경우 false 반환)
        if (selectPosts.length === 0) {
            alert('선택된 글이 없습니다');
            return;
        } else if (!isCheckList) {
            const userConfirmed = window.confirm('선택한 리스트 중 이미 게시 중인 글이 있습니다.\n삭제 상태인 글만 복구를 진행합니다.\n계속 진행 하시려면 확인을 눌러주세요.');
            if (!userConfirmed) {
                return;
            }
        }
        const userConfirmed = window.confirm('복구하시겠습니까?');
        if (!userConfirmed) {
            return;
        }
        axios.post('http://localhost:8080/spring/companyBoard/recoverPost', { postNos: selectPosts }) //  키(key)는 'postNOs'이고 값(value)은 selectPosts배열을 담은 객체형태로 보냄
            .then(() => {
                setSelectPosts([]); // 선택 초기화
                setSelectPostInfos([]);
                axiosGetAllPostList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function dataBaseDelPost() {    // 글 삭제시 해당 글에 달린 댓글 까지 전부 DB에서 삭제처리
        if (selectPosts.length === 0) {
            alert('선택된 글이 없습니다');
            return;
        } else {
            //삭제 확인 창 표시
            const userConfirmed = window.confirm('정말 삭제하시겠습니까?'); //userConfirmed는 처음에는 undefined인 상태임
            if (!userConfirmed) {
                //사용자가 취소를 누르면 함수 종료
                return;
            }
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
        if (tempSearchWord === '') {
            alert('공백 검색 불가!');
        } else {
            setSearchWord(tempSearchWord);
            setSearchTag(tempSearchTag);
        }
    }

    function viewSelect(sv) {
        setSelectPosts([]);
        setSearchWord('');
        setCurrentPage(1);
        setCurrentBlock(1);
        setTempSearchWord('');
        axiosGetAllPostList();
        if (sv === 'av') {
            setDel(false);
            setSelButton(true);
        } else if (sv === 'dv') {
            setDel(true);
            setSelButton(false);
        }
    }

    // 전체 선택/해제 처리
    // 페이지에 표시 되는 글의 개수(allPosts.length)가 0보다 크고, 표시된 글들의 번호와 내가 선택한 글의 번호가 전부 일치 할 경우(전체선택) isAllSelected 는 true 가 된다, 아니면 false 가 된다
    // every함수는 배열의 모든 요소가 충족 하는지 확인 하는 배열 메서드이다, post => selectPosts.includes(post.cb_no) 이런 식으로 콜백 함수를 사용하여야 한다
    const isAllSelected = allPosts.length > 0 && allPosts.every(post => selectPosts.includes(post.cb_no));
    function handleSelectAll() {
        if (isAllSelected) {
            setSelectPosts([]);
            setSelectPostInfos([]);
        } else {
            // 복사된 selectPosts배열에 복사된 allPosts배열을 병합 한 후 ...new Set으로 중복 요소를 제거 한 수 새로운 배열로 만듬
            // Set은 중복 없는 요소를 저장하는 js의 내장 객체임, ...new Set으로 사용하는 이유는 Set은 배열이 아닌 객체이기 때문에 최종 결과물을 배열로 만들기 위함임
            const newSelected = [...new Set([...selectPosts, ...allPosts.map(post => post.cb_no)])];
            setSelectPosts(newSelected);
            //선택 객체 정보 배열 업데이트 (글 복구 관련)
            setSelectPostInfos([...new Set([...selectPostInfos, ...allPosts])]);
        }
    }

    function read(no) {
        const adminAccess = 0;
        readPage('board_read', no, adminAccess);
    }

    //날짜 YYYY-MM-DD 형식으로 변환
    function formatDate(dateString) {
        const date = new Date(dateString); // 문자열을 Date 객체로 변환
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식으로 반환
    }

    //카테고리 관리 로직
    function addBoardCategory(e) {
        //카테고리 중복 확인 처리
        //추가하려는 카테고리와 동일한 이름이 있는 경우 isDuplicateCategory 는 true
        const isDuplicateCategory = categoryList.some(c => c.cb_category_name === addCategory);
        e.preventDefault();
        if (addCategory === '') {
            alert('공백 입력 불가!');
            return;
        }
        if (isDuplicateCategory) {
            alert('이미 해당 카테고리가 존재합니다!');
        } else {
            axios.post(`http://localhost:8080/spring/companyBoard/addCategory?name=${addCategory}`)
                .then(() => {
                    setAddCategory('');
                    axiosGetCategoryList();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    function axiosGetCategoryList() {
        axios.get('http://localhost:8080/spring/companyBoard/categoryList')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function deleteCategory(name) {
        const userConfirmed = window.confirm('카테고리 삭제 시 해당 카테고리의 모든 글도 전부 삭제 됩니다.\n계속 진행 하시려면 확인을 눌러주세요.');
        if (!userConfirmed) {
            return;
        }
        axios.get(`http://localhost:8080/spring/companyBoard/deleteCategory?name=${name}`)
            .then(() => {
                axiosGetAllPostList();
                axiosGetCategoryList();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function allList() {
        setSearchCategory('');
    }

    function onTtrendingPeriod(tp) {
        axios.post(`http://localhost:8080/spring/companyBoard/onTtrendingPeriod?tp=${tp}`)
            .then(() => {
                currentTrendingPeriod();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function currentTrendingPeriod() {
        axios.get('http://localhost:8080/spring/companyBoard/currentTrendingPeriod')
            .then((response) => {
                setPeriod(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_management_page'>
            <div id='management_box'>
                <h3>&lt;게시판 관리&gt;</h3>
                <table id='management_table'>
                    <tbody>
                        <tr>
                            <td className='td1' style={{ width: '7%', height: '30px' }}>글번호</td>
                            <td className='td1' style={{ width: '10%' }}>카테고리</td>
                            <td className='td1_title' style={{ width: '47%' }}>글제목</td>
                            <td className='td1' style={{ width: '8%' }}>작성자</td>
                            <td className='td1' style={{ width: '11%' }}>작성일</td>
                            <td className='td1' style={{ width: '8%' }}>조회수<span onClick={handleSortByHits} style={{ cursor: 'pointer', fontSize: '20px' }}>
                            {isHitsSorted ? '▴' : '▾'}</span></td>
                            <td className='td1' style={{ width: '6%' }}>상태</td>
                            <td className='td1' style={{ width: '3%' }}>
                                <input type='checkbox' checked={isAllSelected} onChange={handleSelectAll} />
                            </td>
                        </tr>
                        {currentPosts.map((p, i) =>
                            <tr key={i}>
                                <td className='td2' style={{ width: '7%', height: '30px' }}>{p.cb_no}</td>
                                <td className='td2' style={{ width: '10%' }}>{p.cb_category}</td>
                                <td className='td3' id='post_title_link' style={{ width: '47%' }} onClick={() => read(p.cb_no)}>{highlightText(p.cb_title, searchWord)}</td>
                                <td className='td2' style={{ width: '8%' }}>{p.company_name}</td>
                                {p.formattedDate === p.formattedModifyDate ?
                                    <td className='td2' style={{ width: '14%' }}>{formatDate(p.formattedDate)}</td> :
                                    <td className='td2' style={{ width: '14%' }}>{formatDate(p.formattedModifyDate)} *수정됨</td>
                                }
                                <td className='td2' style={{ width: '8%' }}>{p.cb_hits}</td>
                                <td className='td2' style={{ width: '6%' }}>{p.cb_is_deleted ? <span style={{ color: 'tomato' }}>삭제</span> : <span>게시</span>}</td>
                                <td className='td2' style={{ width: '3%' }}>
                                    <input type='checkbox' checked={selectPosts.includes(p.cb_no)} onChange={() => checkBoxSelect(p)}></input>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <div id='button_box'>
                    <div id='category_button_box'>
                        <button className={searchCategory === '' ? 'select_button' : 'unSelect_button'} onClick={allList}>전체글 리스트</button>
                        {categoryList
                        .filter(c => !(c.cb_category_name === '전체'))
                        .map((c, i) =>
                            <button className={searchCategory === c.cb_category_name ? 'select_button' : 'unSelect_button'} key={i} onClick={() => setSearchCategory(c.cb_category_name)}>{c.cb_category_name}글 리스트</button>
                        )}
                    </div>
                    <div id='util_button_box'>
                        <button className={selButton ? 'select_button' : 'unSelect_button'} value="av" onClick={(e) => viewSelect(e.target.value)}>모든글 보기</button>
                        <button className={selButton ? 'unSelect_button' : 'select_button'} value="dv" onClick={(e) => viewSelect(e.target.value)}>삭제글 보기</button>
                        <button id='delete_button' onClick={dataBaseDelPost}>삭제<img id='delete_logo' src={deleteButton} alt='delete_logo.png'></img></button>
                        <button id='recover_button' onClick={recoverPost}>복구<img id='recover_logo' src={recoverButton} alt='recover_logo.png'></img></button>
                        {/* <img id='delete_logo' src={deleteButton} alt='delete_logo.png' onClick={dataBaseDelPost}></img> */}
                        {/* <img id='recover_logo' src={recoverButton} alt='recover_logo.png' onClick={recoverPost}></img> */}
                    </div>
                </div>
                <Pagenation currentPage={currentPage} totalPages={totalPages} blockSize={blockSize} onPageChange={setCurrentPage} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
                <div id='search_box'>
                    <form onSubmit={search}>
                        <select id='form_select' onChange={(e) => setTempSearchTag(e.target.value)}>
                            <option value='cb_title'>글제목</option>
                            <option value='company_name'>작성자</option>
                        </select>
                        <input className='form_input' value={tempSearchWord} onChange={(e) => setTempSearchWord(e.target.value)} placeholder='검색어를 입력 해주세요'></input>
                        <button className='form_button' type='submit'>검색</button>
                    </form>
                </div>
                <hr />
                <h3>&lt;카테고리 관리&gt;</h3>
                <div id='category_management_box'>
                    <div id='category_list_box'>
                    {categoryList
                    .filter(c => !(c.cb_category_name === '전체'))
                    .map((c, i) =>
                        <div className='category' key={i}>{c.cb_category_name}<button id='category_delete_button' onClick={() => deleteCategory(c.cb_category_name)}>x</button> </div>
                    )}
                    </div>
                <form onSubmit={addBoardCategory}>
                    <input className='form_input' value={addCategory} onChange={(e) => setAddCategory(e.target.value)}></input>
                    <button className='form_button' type='submit'>카테고리 추가</button>
                </form>
                </div>
                <hr />
                <h3>&lt;인기글 주기 관리&gt;</h3>
                <button className={period === 'day' ? 'select_button' : 'unSelect_button'} value='day' onClick={(e) => onTtrendingPeriod(e.target.value)}>일간</button>
                <button className={period === 'week' ? 'select_button' : 'unSelect_button'} value='week' onClick={(e) => onTtrendingPeriod(e.target.value)}>주간</button>
                <button className={period === 'month' ? 'select_button' : 'unSelect_button'} value='month' onClick={(e) => onTtrendingPeriod(e.target.value)}>월간</button>
            </div>
        </div>
    );
}

export default BoardManagement;
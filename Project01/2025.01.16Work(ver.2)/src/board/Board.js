import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';

function Board({ page, readPage }) {

    const [categoryList, setCategoryList] = useState([]);
    const [notices, setNotices] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    // 카테고리 목록을 가져오는 useEffect
    useEffect(() => {
        axiosGetCategoryList();
    }, []);

    // 카테고리 목록을 가져오는 함수
    function axiosGetCategoryList() {
        axios.get('http://localhost:8080/spring/companyBoard/categoryList')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    // 공지 글과 인기 글을 가져오는 useEffect
    useEffect(() => {
        axios.get('http://localhost:8080/spring/companyBoard/getNoticeAndPopularPosts')
            .then(response => {
                setNotices(response.data.noticePosts);
                setPopularPosts(response.data.popularPosts);
            })
            .catch(error => console.error('게시글 불러오기 에러:', error));
    }, []);

    // 게시글 클릭 시 조회수를 증가시키고 해당 페이지로 이동
    function read(no) {
        axios.get(`http://localhost:8080/spring/companyBoard/hitsUp?no=${no}`)
            .then(() => {
                readPage('board_read', no);
            })
            .catch(error => {
                console.error('에러!', error);
            });
    }

    return (
        <div id="board_page">
            <div id="left_box">
                {/* 카테고리 박스 */}
                {categoryList.map((c, i) =>
                    <div className="category_box" key={i} onClick={() => page('board_getList', c.cb_category_name)} >
                        {c.cb_category_name} 게시판
                    </div>
                )}
            </div>
            
            <div id="center_box">
                {/* 공지 글 박스 */}
                <div id="free_board_box">
                    <h3>공지 글</h3>
                    {notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <div key={index} className="notice_item">
                                <span className="notice_label">공지</span>
                                <span id="notice_link" onClick={() => read(notice.cb_no)}>{notice.cb_title}</span>
                                <span className="notice_hits">{notice.cb_hits}</span>
                            </div>
                        ))
                    ) : (
                        <p>공지 글이 없습니다.</p>
                    )}
                </div>

                {/* 인기 글 박스 */}
                <div id="hits_board_box">
                    <h3>인기 글</h3>
                    {popularPosts.length > 0 ? (
                        popularPosts.map((post, index) => (
                            <div key={index} className="popular_item">
                                <span id="post_title_b_link" onClick={() => read(post.cb_no)}>[{post.cb_category}] {post.cb_title}</span>
                                <span className="post_hits">{post.cb_hits}</span>
                            </div>
                        ))
                    ) : (
                        <p>인기 글이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Board;
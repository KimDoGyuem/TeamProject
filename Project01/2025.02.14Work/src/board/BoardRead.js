import { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';

function BoardRead({ loginId, loginName, postNo, page, readPage }) {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setcomment] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axiosGetRead();
        axiosGetCommentsRead();
    }, []);

    function axiosGetRead() {
        axios.get(`http://localhost:8080/spring/companyBoard/read?postNo=${postNo}`)
            .then((response) => {
                setPost(response.data);
                setCategory(response.data.cb_category);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosGetCommentsRead() {
        axios.get(`http://localhost:8080/spring/companyBoard/commentsRead?commentNo=${postNo}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosCommentsWrite(e) {
        e.preventDefault();
        if (comment === '') {
            alert('공백 입력 금지!');
        } else {
            let body = { cb_no: postNo, company_id: loginId, company_name: loginName, cb_comment_text: comment }
            axios.post('http://localhost:8080/spring/companyBoard/commentsWrite', body)
                .then(() => {
                    setcomment('');
                    axiosGetCommentsRead();
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    function axiosDeletePost() {
        axios.patch(`http://localhost:8080/spring/companyBoard/deletePost?postNo=${postNo}`)
            .then(() => {
                console.log('글삭제 완료! (DB에는 남아있음)');
                page('board', category);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosDeleteComment(no) {
        axios.patch(`http://localhost:8080/spring/companyBoard/deleteComment?no=${no}`)
            .then(() => {
                console.log('댓글삭제 완료! (DB에는 남아있음)');
                axiosGetCommentsRead();
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_read_page'>
            <div id='read_box'>
                {sessionStorage.getItem('adminAccess') !== 'adac' ?
                    <div id='rp_button_box'>
                        {/* <button className='read_buttons' onClick={() => page('board_getList', category)}>{category}게시판</button> */}
                        <button id='return_board_dutton' onClick={() => page('board')}>메인 게시판</button>
                        <div>
                            {post.company_id === loginId && <button id='modify_post_button' onClick={() => readPage('board_modify', postNo)}>글수정</button>} &nbsp;
                            {post.company_id === loginId && <button id='delete_post_button' onClick={() => axiosDeletePost()}>글삭제</button>}
                        </div>
                    </div>
                    :
                    <button id='return_board_management_dutton' onClick={() => readPage('board_management')}>관리 페이지 돌아가기</button>
                }
                <h2>{post.cb_title}</h2>
                <hr />
                <div>
                    <div id='writer_box'>{post.company_name}</div>
                    <div id='post_info_box'>{post.formattedModifyDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수:{post.cb_hits}</div>
                </div>
                {/* (본문)HTML형식의 문자열 렌더링 */}
                <div id='text_box' dangerouslySetInnerHTML={{ __html: post.cb_text }} />

                {comments.map((c, i) => {
                    return c.cb_comment_is_deleted === true ? <div id='delete_comment_box' key={i}>* 삭제된 댓글입니다 * <br /></div> :
                        <div id='comment_box' key={i}>
                            <div id='comment_writer_box1'>
                                <div id='comment_writer_box2'>{c.company_name}</div>
                                {c.company_id === loginId && sessionStorage.getItem('adminAccess') !== 'adac'  && <button id='delete_comment_button' onClick={() => axiosDeleteComment(c.comment_no)}>삭제</button>} <br />
                            </div>
                            <div id='comment_text_box'>{c.cb_comment_text}</div> <div id='comment_date_box'>{c.formattedDatetime}</div>
                        </div>
                }
                )}
                {/* ↓ 이렇게도 쓸 수 있음
                {comments.map((c, i) =>
                c.cb_comment_is_deleted === true ? (<p key={i}>삭제된 댓글입니다</p>) :  
                    (<div key={i}>
                        작성자 : {c.company_name} &nbsp;&nbsp; | &nbsp;&nbsp; 내용 : {c.cb_comment_text} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간 : {c.formattedDate} &nbsp;
                        {c.company_id === loginId && <button onClick={() => axiosDeleteComment(c.comment_no)}>댓글삭제</button>} <br />
                    </div>)
                )} */}

                {sessionStorage.getItem('adminAccess') !== 'adac'  ?
                    <div id='comment_form_box'>
                        <form id='comment_form' onSubmit={axiosCommentsWrite}>
                            <textarea style={{ width: '500px', height: '70px' }} value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='댓글을 입력해주세요'></textarea>
                            <button id='comment_button' type='submit'>등록</button>
                        </form>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default BoardRead;
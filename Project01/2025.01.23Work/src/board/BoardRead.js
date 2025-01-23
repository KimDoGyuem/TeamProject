import { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';

function BoardRead({ loginId, loginName, postNo, adAc, page, readPage }) {

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
            let body = { cb_comment_no: postNo, company_id: loginId, company_name: loginName, cb_comment_text: comment }
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
        axios.post(`http://localhost:8080/spring/companyBoard/deletePost?postNo=${postNo}`)
            .then(() => {
                console.log('글삭제 완료! (DB에는 남아있음)');
                page('board_getList', category); 
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    function axiosDeleteComment(no) {
        axios.post(`http://localhost:8080/spring/companyBoard/deleteComment?no=${no}`)
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
                <h2>[{post.cb_category}]{post.cb_title}</h2>
                작성자 : {post.company_name} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간 : {post.formattedModifyDate} &nbsp;&nbsp; | &nbsp;&nbsp; 조회수 : {post.cb_hits}
                <div id='text_box'>
                {post.cb_text}
                </div>
                <h3>댓글</h3>
                {comments.map((c, i) => {
                    return c.cb_comment_is_deleted === true ? <div id='delete_comment_box' key={i}>* 삭제된 댓글입니다 * <br /></div> :
                        <div id='comment_box' key={i}>
                            <div>작성자 : {c.company_name}</div> <div>내용 : {c.cb_comment_text}</div> <div>작성시간 : {c.formattedDate}</div>
                            {/* 작성자 : {c.company_name} &nbsp;&nbsp; | &nbsp;&nbsp; 내용 : {c.cb_comment_text} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간 : {c.formattedDate} &nbsp; */}
                            {c.company_id === loginId && adAc !== "adminAccess"&& <button onClick={() => axiosDeleteComment(c.comment_no)}>댓글삭제</button>} <br />
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
                <hr />
                {adAc !== "adminAccess" ?
                    <>
                        <form onSubmit={axiosCommentsWrite}>
                            <textarea style={{ width: '500px', height: '50px' }} value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='댓글을 입력해주세요'></textarea> <br />
                            <button type='submit'>댓글등록</button>
                        </form>
                        <hr />
                        <button className='read_buttons' onClick={() => page('board_getList', category)}>{category}게시판</button>
                        {post.company_id === loginId && <button className='read_buttons' onClick={() => readPage('board_modify', postNo)}>글수정</button>}
                        {post.company_id === loginId && <button className='read_buttons' onClick={() => axiosDeletePost()}>글삭제</button>}
                        <button className='read_buttons' onClick={() => page('board')}>게시판 메인으로</button> 
                    </>
                    :
                    <button onClick={() => readPage('board_management')}>관리 페이지 돌아가기</button>
                }
            </div>
        </div>
    );
}

export default BoardRead;
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';

function BoardRead({ loginId, loginName, category, postNo, page, readPage }) {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setcomment] = useState('');

    useEffect(() => {
        axiosGetRead();
        axiosGetCommentsRead();
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
        if(comment === ''){
            alert('공백 입력 금지!');
        }else{
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

    function axiosDeleteComment(text) {
        axios.post(`http://localhost:8080/spring/companyBoard/deleteComment?text=${text}`)
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
                <h2>제목:{post.cb_title}</h2>
                작성자 : {post.company_name} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간 : {post.formattedDate} &nbsp;&nbsp; | &nbsp;&nbsp; 조회수 : {post.cb_hits}
                <hr />
                본문 : {post.cb_text}
                <hr />
                <h3>댓글</h3>
                {comments.map((c, i) =>
                    <div key={i}>
                        작성자 : {c.company_name} &nbsp;&nbsp; | &nbsp;&nbsp; 내용 : {c.cb_comment_text} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간 : {c.formattedDate} &nbsp;
                        {c.company_id === loginId && <button onClick={() => axiosDeleteComment(c.cb_comment_text)}>댓글삭제</button>} <br />
                    </div>
                )}
                <hr />
                <form onSubmit={axiosCommentsWrite}>
                    <textarea style={{ width: '500px', height: '50px' }} value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='댓글을 입력해주세요'></textarea> <br />
                    <button type='submit'>댓글등록</button>
                </form>
                <hr />
                <button onClick={() => page('board_getList', category)}>전체글</button> &nbsp;
                {post.company_id === loginId && <button onClick={() => readPage('board_modify', postNo)}>글수정</button>} &nbsp;
                {post.company_id === loginId && <button onClick={() => axiosDeletePost()}>글삭제</button>}
            </div>
        </div>
    );
}

export default BoardRead;
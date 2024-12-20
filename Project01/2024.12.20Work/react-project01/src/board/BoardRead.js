import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Board.css';

function BoardRead({ loginId, category, postNo, page }) {

    const [post, setPost] = useState({});
    const comments = useRef();

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

    function axiosCommentsWrite(e){
        e.preventDefault();
        let body = {cb_comment_no: postNo, company_id: loginId, cb_comment_text: comments.current.value}
        axios.post('http://localhost:8080/spring/companyBoard/commentsWrite', body)
            .then(() => {
                console.log("댓글 작성 완료!(확인용)");
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_read_page'>
            <div id='read_box'>
                <h2>제목:{post.cb_title}</h2>
                작성자:{post.company_id} &nbsp;&nbsp; | &nbsp;&nbsp; 작성시간:{post.formattedDate} &nbsp;&nbsp; | &nbsp;&nbsp; 조회수:{post.cb_hits} (StrictMode로 인해 한번에 2개씩 올라가는 이슈 있음 코드오류는 아님)
                <hr />
                본문:{post.cb_text}
                <hr />
                댓글 표시 영역
                <hr />
                <form onSubmit={axiosCommentsWrite}>
                    <textarea style={{width: '500px', height: '50px'}} ref={comments} placeholder='댓글을 입력해주세요'></textarea> <br/>
                    <button type='submit'>등록</button>
                </form>
                <hr />
                <button onClick={() => page('board_getList', category)}>전체글</button>
            </div>
        </div>
    );
}

export default BoardRead;
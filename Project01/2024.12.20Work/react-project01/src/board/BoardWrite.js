import { useRef } from 'react';
import './Board.css';
import axios from 'axios';

function BoardWrite({ loginId, category, page }) {
    const id = useRef();
    const boardCategory = useRef();
    const title = useRef();
    const text = useRef();
    
    function axiosBoardWrite(e) {
        e.preventDefault();
        let body = { company_id: id.current.value, cb_title: title.current.value, cb_text: text.current.value, cb_category: boardCategory.current.value}
        axios.post('http://localhost:8080/spring/companyBoard/write', body)
            .then(() => {
                page('board_getList',category);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_write_page'>
            <div id='write_box'>
                <form id='from_box' onSubmit={axiosBoardWrite}>
                    <input ref={id} type='hidden' value={loginId}></input>
                    <input ref={boardCategory} type='hidden' value={category}></input>
                    <input style={{width: '1000px', height: '50px'}} ref={title} placeholder='제목을 입력해주세요'></input> <br/><br/>
                    <textarea style={{width: '1000px', height: '500px'}} ref={text} placeholder='내용을 입력해주세요'></textarea> <br/><br/>
                    <button type='submit'>등록</button> &nbsp;
                    <button onClick={() => page('board_getList',category)}>취소</button>
                </form>
            </div>
        </div>
    );
}

export default BoardWrite;
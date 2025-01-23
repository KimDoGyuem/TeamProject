import { useRef } from 'react';
import './Board.css';
import axios from 'axios';

function BoardWrite({ loginId, loginName, category, page }) { //loginId 굳이 안넘어와도 될듯? 세션으로 그냥 꺼내면 됨 BoardRead.js 참조
    const id = useRef();
    const name = useRef();
    const boardCategory = useRef();
    const title = useRef();
    const text = useRef();

    function axiosBoardWrite(e) {
        e.preventDefault();
        if (title.current.value === '' || boardCategory.current.value === '') {
            alert('공백 입력 금지!');
        } else {
            let body = { company_id: id.current.value, company_name: name.current.value, cb_title: title.current.value, cb_text: text.current.value, cb_category: boardCategory.current.value }
            axios.post('http://localhost:8080/spring/companyBoard/write', body)
                .then(() => {
                    page('board_getList', category);
                })
                .catch(error => {
                    console.error('에러!', error);
                })
        }
    }

    return (
        <div id='board_write_page'>
            <div id='write_box'>
                <h2 style={{ marginLeft: '30px' }}>글쓰기</h2>
                <div id='form_area_box'>
                    <div>
                        <br />
                        <h4>{category} 게시판</h4>
                        <hr />
                        <form onSubmit={axiosBoardWrite}>
                            <input ref={id} type='hidden' value={loginId}></input>
                            <input ref={name} type='hidden' value={loginName}></input>
                            <input ref={boardCategory} type='hidden' value={category}></input>
                            <input style={{ width: '1000px', height: '50px' }} ref={title} placeholder='제목을 입력해주세요'></input> <br/><br/><br/>
                            <textarea style={{ width: '1000px', height: '500px' }} ref={text} placeholder='내용을 입력해주세요'></textarea> <br/><br/>
                            <button id='registration_button' type='submit'>등록</button> &nbsp;
                            <button id='cancell_button' onClick={() => page('board_getList', category)}>취소</button>
                        </form>
                        <br/><br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;
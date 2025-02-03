import { useState, useRef } from 'react';
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


    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // 파일 선택 시 미리보기 설정
    function handleFileChange(e) {
        // e.target.files[0] = 선택한 파일의 배열 인덱스 0번 
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // 임시 url 생성 (자바스크립트 내장 메서드)
            setPreview(URL.createObjectURL(file));
        }
    }

    // async는 비동기 함수를 정의하는 키워드이다
    // async함수는 Promise를 반환하며 그 안에서 await를 사용하여 비동기 작업을 처리 할 수 있다
    async function handleUpload() {
        if (!image) {
            alert('선택한 이미지가 없습니다😢');
            return;
        }
        // FormData 객체 생성 후 'image'라는 이름으로 image 변수를 추가
        // FormData 는 주로 파일 업로드나 폼 데이터를 서버로 전송 할 때 사용됨
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/spring/imageUpload/upload', formData);
            alert('업로드 성공! 이미지 url: ' + response.data);
        } catch (error) {
            console.error('이미지 업로드 실패', error);
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
                            <input style={{ width: '1000px', height: '50px' }} ref={title} placeholder='제목을 입력해주세요'></input> <br /><br /><br />
                            <textarea style={{ width: '1000px', height: '500px' }} ref={text} placeholder='내용을 입력해주세요'><image></image></textarea> <br /><br />
                            <button id='registration_button' type='submit'>등록</button> &nbsp;
                            <button id='cancell_button' onClick={() => page('board_getList', category)}>취소</button>
                        </form>
                        <br />
                        <div id='imageUpload_box'>
                            <input type='file' accept="image/*" onChange={handleFileChange}></input>
                            {preview && <img src={preview} alt='미리보기' style={{ maxWidth: "150px" }} />}
                            <button onClick={handleUpload}>업로드</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;
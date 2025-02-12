import { useRef, useState } from 'react';
import './Board.css';
import axios from 'axios';

function BoardWrite({ loginId, loginName, category, page }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // 서버에 보낼 데이터 (텍스트+이미지)
    const [images, setImages] = useState([]);
    const contentRef = useRef(null);    // 텍스트 입력을 위한 useRef (contentEditable 속성으로 인해 HTML 형식의 문자열로 저장이 됨)

    // contentEditable 내용 변경 이벤트 메서드
    function handleContentChange() {
        if (contentRef.current) {
            // innerHTML은 HTML 형식의 문자열 데이터를 해당 요소에 삽입하는 용도로 사용
            setContent(contentRef.current.innerHTML);
        }
    }

    // 파일 선택 시 본문에서 미리보기
    function handleFileChange(e) {
        // e.target.files[0] = 선택한 파일의 배열 인덱스 0번 
        const file = e.target.files[0];
        if (file) {
            // 임시 이미지URL 생성 (자바스크립트 내장 메서드)
            const previewURL = URL.createObjectURL(file);
            // 입력한 텍스트가 있을 경우
            if (contentRef.current) {
                // 현재 contentRef에 임시 이미지URL이 들어간 이미지 태그 추가
                contentRef.current.innerHTML += `<img src="${previewURL}" alt="첨부 이미지" />`;
                setContent(contentRef.current.innerHTML);
            }
            // 이미지 리스트에 추가(원본 URL과 임시 URL을 저장)
            setImages([...images, { file, previewURL }]);
            // 이미지 삽입 후 파일 선택(input)의 value 값을 초기화(같은 이미지 중복 삽입 설정)
            e.target.value = null;
        }
    }

    // 글 등록 시, 이미지 업로드 후 글 내용 등록
    // async함수는 Promise를 반환하며 그 안에서 await를 사용하여 비동기 작업을 처리 할 수 있다
    async function handleSubmit() {
        let updatedContent = content;
        // FormData 는 주로 파일 업로드나 폼 데이터를 서버로 전송 할 때 사용
        const formData = new FormData();
        // tempDiv라는 이름의 가상 div를 만듬
        const tempDiv = document.createElement('div');
        // tempDiv에 문자열 html 데이터(updatedContent)를 innerHTML을 사용하여 넣음 
        tempDiv.innerHTML = updatedContent;
        // tempDiv에서 img태그로 이루어진 데이터들을 반환
        // .getElementsByTagName()은 HTMLCollection이라는 유사 배열 객체를 반환함
        const imgTags = tempDiv.getElementsByTagName('img');
        // for.. of 문은 배열,문자열,Map,Set등 반복 가능한 객체를 순회할 때 사용하는 js의 반복문
        for (let img of imgTags) {
            // imgTags를 순회하며 img태그의 src 속성을 가져옴
            const src = img.src;
            // startsWith()는 특정 문자열로 시작 하는지 확인 하는 문자열 객체 메서드 true/false 를 반환
            if (src.startsWith('blob:')) {
                // images배열에 저장되어 있는 임시 URL(f.previewURL)과 입력 박스에 표시되고 있는 임시 URL(src)가 같을 경우 해당 객체( {file,previewURL} )를 imageData에 저장
                const imageData = images.find(f => f.previewURL === src);
                // imageData값이 존재 할 경우 FormData 객체에 'image' 라는 이름으로 imageData.file(서버에 전송 할 원본 URL)을 추가
                if (imageData) {
                    formData.append('image', imageData.file);
                }
            }
        }
        try {
            // has()는 객체에서 특정 키(필드)가 존재 하는지 확인하는 메서드 true/false 를 반환
            if (formData.has('image')) {
                const response = await axios.post('http://localhost:8080/spring/imageUpload/upload', formData);
                // 서버에서 반환한 이미지 URL 리스트
                const uploadedUrls = response.data;
                // imgTags은 HTMLCollection(유사 배열 객체)이므로 Array.from()을 사용하여 배열로 만든 후 forEach()문을 실행
                Array.from(imgTags).forEach((img, index) => {
                    if (img.src.startsWith('blob:')) {
                        // 현재 사용중인 임시(blob:)URL을 서버에서 받은 URL로 변경, 이때 tempDiv 안에 있는 <img>태그들의 src가 변경이 됨 
                        img.src = uploadedUrls[index];
                    }
                });
                // 변경된 HTML 데이터를 updatedContent 에 저장
                updatedContent = tempDiv.innerHTML;
            }
            if (title === '' || content === '') {
                alert('공백 입력 금지!');
            } else {
                const body = { company_id: loginId, company_name: loginName, cb_title: title, cb_text: updatedContent, cb_category: category };
                await axios.post('http://localhost:8080/spring/companyBoard/write', body);
                alert('게시글 등록 성공!');
                page('board', category);
            }
        } catch (error) {
            console.error('게시글 등록 실패!', error);
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
                        <input style={{ width: '1000px', height: '50px' }} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요'></input> <br /><br /><br />
                        {/* contentEditable={true}는 div를 편집 가능한 영역으로 만드는 속성 */}
                        <div id='contentEditor' contentEditable={true} ref={contentRef} onInput={handleContentChange}></div>
                        <br />
                        <div id='write_util_box'>
                            <div>
                                <button id='registration_button' onClick={handleSubmit}>등록</button> &nbsp;
                                <button id='cancell_button' onClick={() => page('board', category)}>취소</button>
                            </div>
                            <div id='imageUpload_box'>
                                <input type='file' accept="image/*" onChange={handleFileChange}></input>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;
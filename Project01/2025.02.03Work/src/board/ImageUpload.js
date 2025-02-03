import axios from "axios";
import { useState } from "react";
import './Board.css';

function ImageUpload() {
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
        <div id='imageUpload_box'>
            <input type='file' accept="image/*" onChange={handleFileChange}></input>
            {preview && <img src={preview} alt='미리보기' style={{ maxWidth: "150px"}} />}
            <button onClick={handleUpload}>업로드</button>
        </div>
    );
};

export default ImageUpload;
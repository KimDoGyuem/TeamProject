function highlightText(text, searchWord) {
    // 검색어(searchWord)가 없을 경우 원본 텍스트(text)를 그대로 반환
    if (!searchWord) return text; 

    // 검색어를 대소문자 구분 없이 매칭하기 위한 정규식 생성
    const regex = new RegExp(`(${searchWord})`, 'gi'); 

    // 텍스트를 정규식으로 분리한 뒤, 각 부분을 맵핑하여 처리
    return text.split(regex).map((part, index) =>
        // 분리된 부분이 검색어와 대소문자 구분 없이 일치하는 경우
        part.toLowerCase() === searchWord.toLowerCase() ? (
            // 일치하는 부분을 <span> 태그로 감싸고 초록색으로 강조
            <span key={index} style={{ color: 'green' }}>{part}</span>
        ) : ( 
            // 일치하지 않는 부분은 원본 그대로 반환
            part 
        )
    );
}

// highlightText 함수를 기본 내보내기(export)로 설정
export default highlightText;

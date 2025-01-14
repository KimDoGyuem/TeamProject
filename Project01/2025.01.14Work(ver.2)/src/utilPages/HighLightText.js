function highlightText(text, searchWord) {
    if (!searchWord) return text; // 검색어가 없으면 원본 텍스트 반환
    const regex = new RegExp(`(${searchWord})`, 'gi'); // 대소문자 구분 없이 검색어 매칭
    return text.split(regex).map((part, index) =>
        part.toLowerCase() === searchWord.toLowerCase() ? (
            <span key={index} style={{ color: 'green' }}>{part}</span>
        ) : ( part )
    );
}

export default highlightText;
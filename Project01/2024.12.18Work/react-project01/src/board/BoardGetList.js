import './Board.css';

function BoardGetList({loginId,category}){
    return(
        <div id='board_get_list_page'>
            쓰기-번호,작성자(id),제목,내용,카테고리,조회수?
            읽기
            수정-작성자만 가능하게
            삭제-작성자만 가능하게
            댓글-작성자(id),내용
        </div>
    );
}

export default BoardGetList;
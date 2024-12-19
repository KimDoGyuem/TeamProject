import './Board.css';

function Board({page}){

    return(
        <div id='board_page'>
            <div id='left_box'>
                <div className='category_box' onClick={() => page('board_getList', 'free')} >자유 게시판</div>
            </div>
            <div id='center_box'>
                <div id='free_board_box'>자유게시판 글 박스</div>
                <div id='hits_board_box'>인기 글 박스</div>
            </div>
        </div>
    );
}

export default Board;

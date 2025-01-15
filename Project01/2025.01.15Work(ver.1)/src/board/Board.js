import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';


function Board({ page }) {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axiosGetCategoryList();
    }, []);

    function axiosGetCategoryList() {
        axios.get('http://localhost:8080/spring/companyBoard/categoryList')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_page'>
            <div id='left_box'>
                {categoryList.map((c, i) =>
                    <div className='category_box' key={i} onClick={() => page('board_getList', c.cb_category_name)} >{c.cb_category_name} 게시판</div>
                )}
            </div>
            <div id='center_box'>
                <div id='free_board_box'>자유게시판 글 박스</div>
                <div id='hits_board_box'>인기 글 박스</div>
            </div>
        </div>
    );
}

export default Board;

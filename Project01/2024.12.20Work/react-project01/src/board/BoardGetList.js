import { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';

function BoardGetList({ loginId, category, page, readPage }) {

    const [posts, setPost] = useState([]);

    useEffect(() => {
        axiosGetPostList();
    }, []);

    function axiosGetPostList() {
        axios.get(`http://localhost:8080/spring/companyBoard/getPostList?category=${category}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('에러!', error);
            })
    }

    return (
        <div id='board_get_list_page'>
            <div id='list_box'>
                <h3>글 리스트</h3>
                <table style={{ width: '1270px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '10%', height: '30px' }}>글번호</td>
                            <td style={{ width: '55%' }}>글제목</td>
                            <td style={{ width: '15%' }}>작성자</td>
                            <td style={{ width: '15%' }}>작성일</td>
                            <td style={{ width: '5%' }}>조회수</td>
                        </tr>
                        {posts.map((p, i) =>
                            <tr key={i}>
                                <td style={{ width: '10%', height: '30px' }}>{p.cb_no}</td>
                                <td id='post_title_link' style={{ width: '55%' }} onClick={() => readPage('board_read',p.cb_no)}>{p.cb_title}</td>
                                <td style={{ width: '15%' }}>{p.company_id}</td>
                                <td style={{ width: '15%' }}>{p.formattedDate}</td>
                                <td style={{ width: '5%' }}>{p.cb_hits}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <hr />
                페이징블록 영역
                <button id='main_button' onClick={() => page('board')}>메인으로</button>
                <button id='main_button' onClick={() => page('board_write')}>글쓰기</button>
                <hr />
                검색 영역
            </div>
        </div>
    );
}

export default BoardGetList;
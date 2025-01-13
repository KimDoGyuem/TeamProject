//주의점(참고사항)?
//상태변수 boardList 는 모든 게시글 리스트 담은 함수임 본인의 상태변수명으로 바꿔줘야함 
//currentPosts 가 최종적으로 배열 메서드 map 에 들어갈 배열명이 되는거임     예시) {currentPosts.map(...)}

const [currentPage, setCurrentPage] = useState(1);  //현재 페이지 번호
const [currentBlock, setCurrentBlock] = useState(1); // 현재 블록 번호
const postsPerPage = 5; // 페이지당 게시물 수
const blockSize = 3; // 한 블록에 표시할 페이지 수

  // 현재 페이지에 해당하는 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage; //현재 블록 기준 페이지 끝번호 계산식(시작 인덱스)
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 블록 기준 페이지 첫번호 계산식(종료 인덱스)
  const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost); //slice함수: 기존 배열에서 특정 부분을 추출하여 새 배열을 반환. 원본 배열은 수정되지 않음 
  // 총 페이지 수 계산
  const totalPages = Math.ceil(boardList.length / postsPerPage);
  // 총 블록 수 계산
  const totalBlocks = Math.ceil(totalPages / blockSize);
  // 현재 블록에서 보여줄 페이지 번호
  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  };
  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // 블록 변경
  const prevBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1);
      setCurrentPage((currentBlock - 2) * blockSize + 1); // 이전 블록 첫 페이지로 이동
    }
  };
  const nextBlock = () => {
    if (currentBlock < totalBlocks) {
      setCurrentBlock(currentBlock + 1);
      setCurrentPage(currentBlock * blockSize + 1); // 다음 블록 첫 페이지로 이동
    }
  };
  //화면 영역 표시 페이징 블록 리턴 함수
  function Pagination({ pageNumbers, paginate, prevBlock, nextBlock, currentBlock, totalBlocks }) {
    return (
      <nav>
        <ul className="pagination">
          {currentBlock > 1 && (
            <li className="page-item">
              <button onClick={prevBlock} className="page-link">
                이전 블록
              </button>
            </li>
          )}
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={`page-link ${number === currentPage ? 'active' : ''}`}
              >
                {number}
              </button>
            </li>
          ))}
          {currentBlock < totalBlocks && (
            <li className="page-item">
              <button onClick={nextBlock} className="page-link">
                다음 블록
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
  //리턴 된 페이징 블럭 컴포넌트 
  <Pagination
        pageNumbers={pageNumbers}
        paginate={paginate}
        prevBlock={prevBlock}
        nextBlock={nextBlock}
        currentBlock={currentBlock}
        totalBlocks={totalBlocks}
      />

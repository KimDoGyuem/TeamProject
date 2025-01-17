
function Pagenation({currentPage, totalPages, blockSize, onPageChange, currentBlock, setCurrentBlock }) {

    // 총 블록 수 계산
    const totalBlocks = Math.ceil(totalPages / blockSize);
    // 현재 블록에서 보여줄 페이지 번호
    const startPage = (currentBlock - 1) * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    };
    // 블록 변경
    //01-13수정됨(이전 블록 끝 페이지로 이동)
    const prevBlock = () => {
        if (currentBlock > 1) {
            setCurrentBlock(currentBlock - 1);
            // onPageChange((currentBlock - 2) * blockSize + 1); // 이전 블록 첫 페이지로 이동
            onPageChange((currentBlock - 1) * blockSize); // 이전 블록 끝 페이지로 이동
        }
    };
    const nextBlock = () => {
        if (currentBlock < totalBlocks) {
            setCurrentBlock(currentBlock + 1);
            onPageChange(currentBlock * blockSize + 1); // 다음 블록 첫 페이지로 이동
        }
    };
    //화면 영역 표시 페이징 블록 리턴 함수
    function Pagination({ pageNumbers, prevBlock, nextBlock, currentBlock, totalBlocks }) {
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
                                onClick={() => onPageChange(number)}
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
    return(
        <Pagination
        pageNumbers={pageNumbers}
        prevBlock={prevBlock}
        nextBlock={nextBlock}
        currentBlock={currentBlock}
        totalBlocks={totalBlocks}
        />
    );
}

export default Pagenation;
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null; 
  let items = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (totalPages > 5) {
    if (endPage === totalPages) {
      startPage = totalPages - 4;
    } else if (startPage === 1) {
      endPage = 5;
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage} 
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        {/* Botón Anterior */}
        <Pagination.Prev 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        
        {}
        {(startPage > 1) && (
          <>
            <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis />}
          </>
        )}

        {items}

        {}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => onPageChange(totalPages)}>{totalPages}</Pagination.Item>
          </>
        )}

        {/* Botón Siguiente */}
        <Pagination.Next 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
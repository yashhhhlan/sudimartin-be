import { ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between mt-4 space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`2xl:size-10 lg:size-8 rounded-full text-sm font-medium flex items-center justify-center ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ChevronRight className="rotate-180" />
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`2xl:size-10 lg:size-8 rounded-full text-sm font-medium ${
              currentPage === page ? 'bg-[#2673DD] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`2xl:size-10 lg:size-8 rounded-full text-sm font-medium flex items-center justify-center ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#2673DD] text-white hover:bg-[#1e5bb8]'
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

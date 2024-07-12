'use client';
import { Pagination } from '@nextui-org/react';

interface CommentPaginationProps {
  page: number;
  totalComments: number;
  onPageChange: (page: number) => void;
}

const CommentPagination = ({ page, totalComments, onPageChange }: CommentPaginationProps) => {
  const handleChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-6 flex justify-center">
      <Pagination isCompact showControls total={totalComments} page={page} onChange={handleChange} />
    </div>
  );
};

export default CommentPagination;

'use client';

import useCommentQuery from '@/hooks/useCommentQuery';
import { Tables } from '@/types/supabase';
import { Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { TargetValue } from './Comment';
import CommentPagination from './Pagination';

interface Props {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTargetValue: Dispatch<SetStateAction<TargetValue>>;
  user: any;
}

const CommentList = ({ isEdit, setIsEdit, setTargetValue, user }: Props) => {
  const queryClient = useQueryClient();

  const { id: postId } = useParams<{ id: string }>();
  const { comments, isPending } = useCommentQuery({ postId });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const offset: number = (page - 1) * pageSize;
  const commentsToDisplay = comments?.slice(offset, offset + pageSize);

  const handleEdit = (comment: Tables<'comments'>) => {
    setIsEdit(false);
    setIsEdit(!isEdit);
    const { id, title, content }: any = comment;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const textContent = doc.body.textContent || '';

    setTargetValue((prev) => ({ ...prev, id, title: isEdit ? '' : title, content: isEdit ? '' : textContent }));
  };

  const deleteComment = async (id: string) => {
    const response = await fetch(`/api/comment/?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const deleteErrorText = await response.text();
      throw new Error(deleteErrorText);
    }
    return response.json();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      alert('삭제 완료');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleDelete = (id: string) => {
    if (!confirm('삭제시 복구가 어렵습니다. 정말 삭제하시겠습니까?')) {
      return;
    }
    deleteMutation.mutate(id);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isPending || !comments)
    return (
      <div className="w-[100%] flex justify-center">
        <Spinner />
      </div>
    );
  const totalPages = Math.ceil(comments.length / 6);

  return (
    <div>
      <div className="flex gap-2 items-center my-4">
        <div className="border-b-2 border-black flex gap-2 items-center">
          <h3 className=" font-bold text-[20px]">코멘트</h3>
          <p className="text-[#AF5858]">{comments.length}</p>
        </div>
      </div>
      {commentsToDisplay?.length === 0 ? (
        <div>No comments yet</div>
      ) : (
        <ul className="border-y-2 border-black mt-[2rem]">
          {commentsToDisplay?.map((comment) => {
            const { id, title, content, writer, created_at, user_id } = comment;
            const date = dayjs(created_at).locale('ko').format('YYYY-MM-DD HH:mm');
            const buttonClass = 'w-fit px-2 py-1 rounded text-white';

            return (
              <li key={id} className="flex group h-[120px] items-center justify-around border-b-1 border-black">
                <h3 className="w-[12%] font-bold flex justify-center text-[16px]">{title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: content || '' }}
                  className="w-[70%] bg-white text-[16px] break-words"
                />
                <div className="w-[12%] flex flex-col gap-2 items-end text-[13px]">
                  <p>{writer}</p>
                  <p>{date}</p>
                </div>
                <div
                  className={`hidden ${
                    user?.id === user_id && 'group-hover:flex'
                  } gap-2 transition-opacity duration-300 absolute right-[11vw]`}
                >
                  <button className={`${buttonClass} bg-gray-700 border-2`} onClick={() => handleEdit(comment)}>
                    {isEdit ? '취소' : '수정'}
                  </button>
                  <button className={`${buttonClass} bg-[#ad5f5f]`} onClick={() => handleDelete(id)}>
                    삭제
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <CommentPagination page={page} totalComments={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default CommentList;

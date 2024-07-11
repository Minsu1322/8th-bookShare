'use client';

import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import 'react-quill/dist/quill.snow.css';
import { TargetValue } from './Comment';

type SubmitItem = Pick<Tables<'comments'>, 'id' | 'title' | 'content' | 'post_id' | 'writer'>;
interface Props {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  targetValue: TargetValue;
  setTargetValue: Dispatch<SetStateAction<TargetValue>>;
  comment?: TargetValue | undefined;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentForm = ({ isEdit, setIsEdit, targetValue, setTargetValue, comment }: Props) => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams<{ id: string }>();

  const handleChange = (value: string) => {
    setTargetValue((prev) => ({ ...prev, content: value }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetValue((prev) => ({ ...prev, title: e.target.value }));
  };

  const addComment = async (newComment: SubmitItem) => {
    const response = await fetch('/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    return response.json();
  };

  const updateComment = async (updatedComment: SubmitItem & { id: string }) => {
    const response = await fetch(`/api/comment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedComment)
    });

    return response.json();
  };

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setTargetValue({ title: '', content: '' });
      alert('댓글 작성 완료');
    },
    onError: () => {
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setIsEdit(false);
      setTargetValue((prev) => ({ ...prev, title: '', content: '' }));
      alert('댓글 수정 완료');
    },
    onError: () => {
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 유저 정보 연결
    const nickname: string = 'fake_nickname';
    const fakeUserId: string = '109a82bf-afff-4867-80a1-92978f4bea6f';
    const cleanContent: string = DOMPurify.sanitize(targetValue.content || '');

    //TODO 타입지정
    const newComment: any = {
      user_id: fakeUserId,
      title: targetValue.title || '',
      content: cleanContent,
      post_id: postId,
      writer: nickname
    };

    if (isEdit && targetValue.id) {
      const updatedComment = { ...newComment, id: targetValue.id, created_at: new Date(Date.now()) };
      updateMutation.mutate(updatedComment);
    } else {
      addMutation.mutate(newComment);
    }
  };
  const handleCancel = () => {
    setIsEdit(false);
    setTargetValue({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#D9D9D9] p-6 mt-2">
      <input type="text" placeholder="제목" value={targetValue.title} onChange={handleEditChange} required />
      <ReactQuill className="bg-white" theme="snow" value={targetValue.content} onChange={handleChange} />
      <div className="flex gap-2">
        <button className="bg-[#AF5858] px-4 py-1 rounded-md" type="submit">
          {isEdit ? '수정' : '업로드'}
        </button>
        {isEdit && (
          <button className="bg-gray-500 px-4 py-1 rounded-md" type="button" onClick={handleCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
};
export default CommentForm;

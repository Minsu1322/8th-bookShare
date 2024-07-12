'use client';

import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
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
  user: any;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentForm = ({ isEdit, setIsEdit, targetValue, setTargetValue, comment, user }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: postId } = useParams<{ id: string }>();

  const handleChange = (value: string) => {
    if (!user) {
      if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠습니까?')) {
        router.prefetch('login');
      } else return;
    }
    if (value.length <= 200) {
      setTargetValue((prev) => ({ ...prev, content: value }));
    } else {
      alert('230자 이상은 작성 불가능합니다');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠습니까?')) {
        router.prefetch('login');
      } else return;
    }
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
    const cleanContent: string = DOMPurify.sanitize(targetValue.content || '');

    const newComment: any = {
      user_id: user.id,
      title: targetValue.title || '',
      content: cleanContent,
      post_id: postId,
      writer: user.user_metadata.nickname
    };

    if (isEdit && targetValue.id) {
      const updatedComment = { ...newComment, id: targetValue.id, created_at: targetValue.created_at };
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
    <form onSubmit={handleSubmit} className="bg-[#D9D9D9] p-6 mt-2 flex flex-col h-280px">
      <input
        type="text"
        placeholder="제목 입력"
        value={targetValue.title}
        onChange={handleEditChange}
        required
        maxLength={20}
        className="w-[100%] h-[40px] p-2 text-lg"
      />
      <ReactQuill
        className="bg-white h-[150px] overflow-hidden"
        theme="snow"
        value={targetValue.content}
        onChange={handleChange}
      />
      <div className="flex gap-2 justify-end mt-6">
        <button className="bg-[#AF5858] text-white px-4 py-1 rounded-md" type="submit">
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

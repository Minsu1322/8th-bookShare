'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export type NowUser = {
  nickname: string;
  user_id: string;
};
export type TargetValue = {
  id?: string;
  title: string | undefined;
  content: string | undefined;
  post_id?: string | string[];
  writer?: string;
  created_at?: string;
};

const Comment = () => {
  const { id: postId } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<TargetValue>({
    id: '',
    title: '',
    content: '',
    post_id: postId,
    writer: 'fake_nickname',
    created_at: ''
  });

  const isLogin: boolean = true;

  return (
    <div className="container mx-auto p-4">
      <CommentList isEdit={isEdit} setIsEdit={setIsEdit} setTargetValue={setTargetValue} />
      <CommentForm
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        targetValue={targetValue}
        setTargetValue={setTargetValue}
        comment={isEdit ? targetValue : undefined}
      />
    </div>
  );
};

export default Comment;

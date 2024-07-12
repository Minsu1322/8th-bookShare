'use client';
import { createClient } from '@/utils/supabase/client';
import { Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log('no user');
      } else {
        setUser(data.user);
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  console.log({ user });

  if (isLoading) {
    return (
      <div className="w-[100%] flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <CommentList isEdit={isEdit} setIsEdit={setIsEdit} setTargetValue={setTargetValue} user={user} />
      <CommentForm
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        targetValue={targetValue}
        setTargetValue={setTargetValue}
        comment={isEdit ? targetValue : undefined}
        user={user}
      />
    </div>
  );
};

export default Comment;

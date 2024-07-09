'use client';

import { useParams } from 'next/navigation';
//TODO 클라이언트 컴포넌트로 둬야하는지 다시 생각

import CommentForm from './CommentForm';
import CommentList from './CommentList';

type NowUser = {
  nickname: string;
  user_id: string;
};

const Comment = () => {
  const { id: paramsId } = useParams();

  const isLogin: boolean = true;

  const nowUser: NowUser = {
    nickname: 'nickname',
    user_id: 'id'
  };

  return (
    <div>
      <CommentList />
      <CommentForm />
    </div>
  );

  //TODO comment 테이블 post_id 항목 생성 (입력시 paramsId 할당)
};

export default Comment;

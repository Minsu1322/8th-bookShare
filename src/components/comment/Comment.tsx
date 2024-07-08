'use client';
import { useParams } from 'next/navigation';
//TODO 클라이언트 컴포넌트로 둬야하는지 다시 생각

import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Comment = () => {
  const { id: paramsId } = useParams();

  return (
    <div>
      <CommentForm />
      <CommentList />
    </div>
  );

  //TODO comment 테이블 post_id 항목 생성 (입력시 paramsId 할당)
};

export default Comment;

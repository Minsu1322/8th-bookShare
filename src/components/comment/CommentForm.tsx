import { Textarea } from '@nextui-org/react';

const CommentForm = () => {
  const variants = ['flat', 'faded', 'bordered', 'underlined'];
  return (
    <div>
      <Textarea className="w-[500px]" placeholder="댓글 입력" />

      <div className="w-64 bg-gray-200 mt-4">Test Box</div>

      <textarea className="border-2" name="" id=""></textarea>
      <button>작성</button>
    </div>
  );
};

export default CommentForm;

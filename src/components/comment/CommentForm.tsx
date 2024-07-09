'use client';

import dynamic from 'next/dynamic';

import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentForm = () => {
  const { id: paramsId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanContent: string = DOMPurify.sanitize(content);

    await fetch('/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content: cleanContent,
        post_id: paramsId
      })
    });

    console.log(title, cleanContent, paramsId);

    setTitle('');
    setContent('');

    //TODO 서버 에러가 발생했을때에도 알럿 작동, 완료시에만 알럿 처리
    // alert('댓글 작성 완료');
  };
  return (
    <form onSubmit={handleSubmit} className="bg-[#D9D9D9] p-6">
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill className="bg-white" theme="snow" value={content} onChange={handleChange} />
      <button className="bg-[#AF5858] px-4 py-1 rounded-md" type="submit">
        업로드
      </button>
    </form>
  );
};

export default CommentForm;

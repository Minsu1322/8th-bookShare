import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
const supabase = createClient();

export const POST = async (request: NextRequest) => {
  const response = await request.json();

  const { title, content, post_id, writer, user_id }: Tables<'comments'> = response;

  const { error } = await supabase.from('comments').insert({ title, content, post_id, writer, user_id });

  if (error) {
    console.error(error);
    return NextResponse.json({ status: '에러', message: error.message });
  }

  return NextResponse.json({ status: '200' });
};

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('post_id');

    if (!postId) {
      return NextResponse.json({ message: 'post_id 가 필요합니다' }, { status: 400 });
    }

    const response = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('post_id', postId);

    const { data, error } = response;
    if (error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '예기치 않은 오류가 발생했습니다' }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const updateComment = await request.json();
    const { id, ...rest } = updateComment;

    console.log('Request payload:', updateComment);

    if (!id) {
      return NextResponse.json({ error: 'id가 올바르지 않습니다' }, { status: 400 });
    }
    console.log('Updating comment with id:', id, 'and data:', rest);

    const { error } = await supabase.from('comments').update(rest).eq('id', id);

    if (error) {
      throw error;
    }
    return NextResponse.json({ message: '댓글 업데이트 완료' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '댓글 업데이트 중 오류 발생' }, { status: 500 });
  }
};
export const DELETE = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  try {
    if (!id) {
      return NextResponse.json({ error: 'id가 올바르지 않습니다' }, { status: 400 });
    }

    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return NextResponse.json({ message: '댓글 삭제 완료' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
  }
};

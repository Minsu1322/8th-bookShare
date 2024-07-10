import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

interface CommentData {
  title: string;
  content: string;
  post_id: string;
}

export const POST = async (request: NextRequest) => {
  const supabase = createClient();

  const response = await request.json();
  console.log(response);

  // const requestBody = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;

  // console.log('-------------------------------');
  // console.log(requestBody);
  // console.log('--------------------------------');

  const { title, content, post_id }: CommentData = response;

  const { data, error } = await supabase.from('comments').insert({ title, content, post_id });
  console.log(data);
  console.log('----------------------------------------------------------------------');
  console.log(error);
  //error : response.status is not a function
  //TODO 1 response 자체가 undefinded 반환. 결과값 제대로 받아오기
  //2 response에 status 항목이 있는지 확인

  if (error) {
    console.log(error);
    // return response.status(500).json({ error: error.message });
  }

  return NextResponse.json({ status: 'success' });
  // response.status(200).json({ message: '댓글 저장 완료', data });
};
// export default async (request: NextApiRequest, response: NextApiResponse) => {
//   switch (request.method) {
//     case 'POST':
//       const { title, content, post_id } = request.body;

//       const { data: postData, error: postError } = await supabase
//         .from('comments')
//         .insert([{ title, content, post_id }]);

//       if (postError) {
//         console.error(postError);
//         return response.status(500).json({ error: postError.message });
//       }
//       response.status(200).json({ message: '댓글 저장 완료', postData });
//       break;

//     case 'GET':
//       const { data: getData, error: getError } = await supabase.from('comments').select('*');

//       if (getError) {
//         return response.status(500).json({ error: getError.message });
//       }

//       response.status(200).json({ comments: getData });
//       break;

// case 'PATCH':

//   break;

// case 'DELETE':

//   break;

//     default:
//       console.log('request.method:', request.method);
//       response.status(405).json({ message: 'Method Not Allowed' });
//   }
// };

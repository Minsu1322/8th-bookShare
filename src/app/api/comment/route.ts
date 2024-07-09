import supabase from '@/components/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export const POST = async (request: NextApiRequest, response: NextApiResponse) => {
  const { title, content, post_id } = request.body;

  const { data, error } = await supabase.from('comments').insert([{ title, content, post_id }]);
  console.log(response);
  //response.status is not a function으로 뜸
  //TODO 1 response 자체가 undefinded 반환. 결과값 제대로 받아오기
  //2 response에 status 항목이 있는지 확인

  if (error) {
    return response.status(500).json({ error: error.message });
  }
  response.status(200).json({ message: '댓글 저장 완료', data });
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

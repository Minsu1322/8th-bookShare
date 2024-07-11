import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import Error from 'next/error';

interface Props {
  postId: string;
}
const useCommentQuery = ({ postId }: Props) => {
  const { data: comments, isPending: commentsIsPending } = useQuery<Tables<'comments'>[], Error, Tables<'comments'>[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetch(`/api/comment?post_id=${postId}`, {
        method: 'GET'
      });
      const data = await response.json();

      return data;
    }
  });
  return { comments, commentsIsPending };
};

export default useCommentQuery;

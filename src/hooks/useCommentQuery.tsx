import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

interface CommentQueryParams {
  postId: string;
}
const fetchComments = async (postId: string) => {
  const response = await fetch(`/api/comment?post_id=${postId}`);
  const data = await response.json();
  return data;
};

const useCommentQuery = ({ postId }: CommentQueryParams) => {
  const {
    data: comments,
    isPending,
    error
  } = useQuery<Tables<'comments'>[], Error, Tables<'comments'>[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId)
  });

  return { comments, isPending, error };
};

export default useCommentQuery;

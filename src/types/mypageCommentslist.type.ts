export type Mycommentlist = {
  data: {
    content: string;
    created_at: string;
    id: string;
    post_id: string;
    title: string;
    user_id: string;
    writer: string;
  }[];
  total: number;
};

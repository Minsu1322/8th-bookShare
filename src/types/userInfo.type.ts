export type UserInfoType = {
  email: string;
  nickname: string;
  created_at: string;
  avatar: string;
  id: string;
};

export interface UserInfoPropsType {
  userInfo: UserInfoType;
}

export type MyCommentsListType = {
  content: string;
  created_at: string;
  id: string;
  post_id: string;
  title: string;
  user_id: string;
  writer: string;
};

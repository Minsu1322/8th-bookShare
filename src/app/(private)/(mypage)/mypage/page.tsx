import React from 'react';
import Mypage from './_components/Mypage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description:
    '환영합니다! 여기는 당신의 개인 공간입니다. 회원정보를 확인하고, 댓글을 관리하며 다양한 활동을 즐길 수 있는 곳입니다. 자유롭게 탐색해 보세요!',
  icons: {
    icon: '/projectbookin.ico'
  }
};
const ProfilePage = () => {
  return <Mypage />;
};

export default ProfilePage;

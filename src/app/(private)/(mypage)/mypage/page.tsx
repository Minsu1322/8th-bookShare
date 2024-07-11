'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import CommentList from './_components/commentlist';
import LikedList from './_components/likedlist';
import UserInfo from './_components/userInfo';
import { toast } from 'react-toastify';

const taps = [
  { label: '회원정보', content: <UserInfo /> },
  { label: '댓글목록', content: <CommentList /> },
  { label: '찜 목록', content: <LikedList /> }
];

const Mypage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const avatarImgRef = useRef(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const fileExtension = ['.jpg', '.jpeg', '.png', '.gif'];
    if (!files['0']) {
      toast.error('아바타 업로드 취소하셨습니다.', {
        position: 'top-right'
      });
      return;
    }
    const userUploadfileExtension = files['0'].name.split('.').pop()?.toLowerCase();
    if (!fileExtension.includes(`.${userUploadfileExtension}`)) {
      console.error('지원하지 않는 파일 형식입니다. JPG, JPEG, PNG, GIF 파일만 업로드 가능합니다.');
      toast.error('지원하지 않는 파일 형식입니다. JPG, JPEG, PNG, GIF 파일만 업로드 가능합니다.', {
        position: 'top-right'
      });
      // 에러 처리 로직 추가
      return;
    }
    console.log(files['0'].name.split('.').pop()?.toLowerCase());
  };

  //   const data = await getUserInfo();
  return (
    <>
      <div className="flex justify-between sm:w-[1280px] mx-auto items-center">
        <div className="bg-[#af5858] w-[250px] h-[670px] flex flex-col items-center justify-center rounded-tr-[50px]">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-[10px]">
            <Image src="/images/noImg.png" width={100} height={100} alt="avatarImg" className="block w-full h-full " />
          </div>
          <div>
            <label
              htmlFor="avatarImgUpload"
              className="text-base text-[#af5858] font-bold text-center mt-[30px] w-[80px] h-[30px] mb-[30px] bg-white rounded-full cursor-pointer flex items-center justify-center"
            >
              업로드
            </label>
            <input
              id="avatarImgUpload"
              ref={avatarImgRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleAvatarUpload}
            />
          </div>
          <h3 className="text-white text-xl font-bold">환영합니다.</h3>
          <p className="text-white text-xl font-bold mb-[30px]">르탄이님</p>
          <nav className="w-full">
            <ul className="w-full">
              {taps.map((tap, index) => (
                <li key={index} className="text-center w-full">
                  <button
                    className={`text-white w-full text-xl p-4 font-bold transition ${
                      activeTab === index ? 'bg-[#783A3A]' : 'bg-[#af5858]'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tap.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button className="text-base text-[#af5858] font-bold text-center mt-[30px] w-[80px] h-[30px] rounded-full  bg-white">
            로그아웃
          </button>
        </div>
        <div className="w-3/4">{taps[activeTab].content}</div>
      </div>
    </>
  );
};

export default Mypage;

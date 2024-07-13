'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { redirect, useRouter } from 'next/navigation';
import { UserInfoType } from '@/types/userInfo.type';
import { logout } from '@/app/logout/actions';
import { Spinner } from '@nextui-org/react';
import CommentList from './commentlist';
import UserInfo from './userInfo';


const Mypage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const avatarImgRef = useRef(null);
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: userInfo,
    isPending,
    isError
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async (): Promise<UserInfoType> => {
      try {
        const { data, error } = await supabase.auth.getUser();
        const userId = data.user?.id as string;
        const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();

        if (userError || !user) {
          throw new Error('User data retrieval error');
        }
        const userData: UserInfoType = {
          email: user.email,
          nickname: user.nickname,
          id: user.id,
          created_at: user.created_at,
          avatar: user.avatar
        };

        return userData;
      } catch (error) {
        if (error instanceof SupabaseAuthClient) {
          throw new Error('supabase error');
        }
        throw new Error('예상치못한 에러 발생 from getUser함수부분');
      }
    }
  });
  const updateAvatarImg = useMutation<unknown, Error, string, unknown>({
    mutationFn: async (imgURL) => {
      const { data: userData } = await supabase
        .from('users')
        .update({ avatar: imgURL })
        .eq('id', userInfo?.id || '');

      return userData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    }
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      return;
    }
    try {
      const { data, error } = await supabase.storage.from('avatars').upload(`avatar_${files[0].name}`, files[0], {
        cacheControl: '3600',
        upsert: true
      });

      if (error) {
        throw error;
      }

      const imgURL = `https://blthjtndgzdzyqcvkdmm.supabase.co/storage/v1/object/public/avatars/${data.path}`;

      updateAvatarImg.mutate(imgURL);
      toast.success('아바타 업로드 완료!', {
        position: 'top-right'
      });
    } catch (error) {
      console.error('파일 업로드 또는 데이터 저장 중 에러 발생:');
      toast.error('파일 업로드 또는 데이터 저장 중 에러 발생', {
        position: 'top-right'
      });
    }
  };

  const taps = [
    { label: '회원정보', content: userInfo ? <UserInfo userInfo={userInfo} /> : null },
    { label: '댓글목록', content: userInfo ? <CommentList userInfo={userInfo} /> : null }
  ];
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router, supabase.auth]);
  if (isPending) return <Spinner className="w-full h-[670px] mx-auto" />;
  if (isError) return <div>Error</div>;
  return (
    <>
      <div className="flex justify-between sm:w-[1280px] mx-auto items-end">
        <div className="bg-[#af5858] w-[250px] h-[670px] flex flex-col items-center justify-center rounded-tr-[50px]">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-[10px]">
            <Image
              src={userInfo.avatar || '/images/noImg.png'}
              width={100}
              height={100}
              alt="avatarImg"
              className="block w-full h-full "
            />
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
          <p className="text-white text-xl font-bold mb-[30px]">{userInfo.nickname}님</p>
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
          <form action={logout}>
            <button className="text-base text-[#af5858] font-bold text-center mt-[30px] w-[80px] h-[30px] rounded-full  bg-white">
              로그아웃
            </button>
          </form>
        </div>
        <div className="w-3/4 h-[600px] flex flex-col justify-between">{taps[activeTab].content}</div>
      </div>
    </>
  );
};

export default Mypage;

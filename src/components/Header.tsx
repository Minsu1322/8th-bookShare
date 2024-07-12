'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';

export default function Header() {
  const genres = [
    {
      key: 'home',
      label: '가정/요리/뷰티'
    },
    {
      key: 'health',
      label: '건강/취미/레저'
    },
    {
      key: 'business',
      label: '경제경영'
    },
    {
      key: 'classic',
      label: '고전'
    },
    {
      key: 'science',
      label: '과학'
    },
    {
      key: 'comic',
      label: '만화'
    },
    {
      key: 'social science',
      label: '사회과학'
    },
    {
      key: 'novel',
      label: '소설/시/희곡'
    },
    {
      key: 'certificate',
      label: '수험서/자격증'
    },
    {
      key: 'children',
      label: '어린이'
    },
    {
      key: 'essay',
      label: '에세이'
    },
    {
      key: 'travel',
      label: '여행'
    },
    {
      key: 'history',
      label: '역사'
    },
    {
      key: 'art',
      label: '예술/대중문화'
    },
    {
      key: 'foreign language',
      label: '외국어'
    },
    {
      key: 'infant',
      label: '유아'
    },
    {
      key: 'high school',
      label: '고등학교 참고서'
    },
    {
      key: 'university',
      label: '대학교재/전문서적'
    }
  ];

  const supabase = createClient();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const session = supabase.auth.getSession(); // 사용자가 로그인되어 있는지 여부를 확인
    setIsLoggedIn(session !== null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // 사용자가 로그인하거나 로그아웃할 때마다 호출되며, 콜백 함수를 통해 이벤트와 사용자 세션 정보를 전달받는다. 일반적으로 로그인 상태 변화에 따라 UI를 업데이트하거나 특정 작업을 수행하는 데 사용
      setIsLoggedIn(session !== null);
    });

    return () => {
      authListener.subscription.unsubscribe(); // 사용자의 인증 상태 변화를 실시간으로 감지
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('로그아웃 되었습니다.');
    router.push('/');
  };

  return (
    <header>
      <Navbar maxWidth="full" className="bg-main">
        <NavbarContent className="hidden sm:flex gap-6 font-bold" justify="start">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Link className="text-white">국내도서</Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={genres}>
                {(genre) => <DropdownItem key={genre.key}>{genre.label}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">외국도서</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">eBook</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">책In Only</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">커뮤니티</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarBrand>
            <Link href="/">
              <svg width="50" height="50" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 16C35.1826 16 38.2348 17.2643 40.4853 19.5147C42.7357 21.7652 44 24.8174 44 28V42H36V28C36 26.9391 35.5786 25.9217 34.8284 25.1716C34.0783 24.4214 33.0609 24 32 24C30.9391 24 29.9217 24.4214 29.1716 25.1716C28.4214 25.9217 28 26.9391 28 28V42H20V28C20 24.8174 21.2643 21.7652 23.5147 19.5147C25.7652 17.2643 28.8174 16 32 16Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18H4V42H12V18Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <NavbarItem>
                <Link href="/login">
                  <Button className="bg-white text-black font-semibold">마이페이지</Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-black text-white font-semibold" onClick={handleLogout}>
                  로그아웃
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Link href="/login">
                  <Button className="bg-white text-black font-semibold">로그인</Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/terms">
                  <Button className="bg-black text-white font-semibold">회원가입</Button>
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
}

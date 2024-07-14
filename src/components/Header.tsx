'use client';

import useGenres from '@/hooks/useGenres';
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
  const { koreanGenres, foreignGenres, ebookGenres } = useGenres();

  const supabase = createClient();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // 초기값을 null로 설정하여 로딩 상태를 구분

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setIsLoggedIn(session !== null);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(session !== null);
    });

    return () => {
      authListener.subscription.unsubscribe();
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
        <NavbarContent className="hidden sm:flex gap-6 font-bold ml-[100px]" justify="start">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <button className="text-white">국내도서</button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={koreanGenres}>
                {(genre) => (
                  <DropdownItem key={genre.id} href={`/category/${genre.id}`}>
                    {genre.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <button className="text-white">외국도서</button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={foreignGenres}>
                {(genre) => (
                  <DropdownItem key={genre.id} href={`/category/${genre.id}`}>
                    {genre.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <button className="text-white">eBook</button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={ebookGenres}>
                {(genre) => (
                  <DropdownItem key={genre.id} href={`/category/${genre.id}`}>
                    {genre.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
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
        <NavbarContent justify="end" className="mr-[100px]">
          {isLoggedIn !== null && (
            <>
              {isLoggedIn ? (
                <>
                  <NavbarItem>
                    <Link href="/mypage">
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
            </>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
}

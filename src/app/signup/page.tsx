'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password || !nickname) {
      return toast.error('빈칸을 모두 채워주세요!');
    }

    // 클라이언트 사이드 유효성 검사
    if (!validateEmail(email)) {
      return toast.error('유효한 이메일 주소를 입력하세요!(꼭 .com 으로 끝나는 이메일이어야 합니다!)');
    }
    if (!validatePassword(password)) {
      return toast.error('비밀번호는 최소 8자 이상, 영문자, 숫자, 특수 문자를 포함해야 합니다!');
    }

    // 이메일과 닉네임 중복 체크
    const { data: emailExist, error: emailError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (emailExist) {
      return toast.error('이미 사용 중인 이메일입니다!');
    }

    const { data: nicknameExist, error: nicknameError } = await supabase
      .from('users')
      .select('id')
      .eq('nickname', nickname)
      .single();

    if (nicknameExist) {
      return toast.error('이미 사용 중인 닉네임입니다!');
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // emailRedirectTo: email,
        data: {
          nickname: nickname
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      toast.success('회원가입 성공!');
      router.push('/');
    }
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string): boolean => {
    // 최소 하나의 영문자, 하나의 숫자, 하나의 특수 문자를 포함하는지 확인
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <div className="bg-[#f6f5f7] flex justify-center items-center flex-col min-h-screen h-full mt-[-20px] mb-[50px]">
      <div className="border border-inherit rounded-md shadow-lg shadow-slate-500 w-80 h-[480px]">
        <form className="bg-[#ffffff] flex justify-center items-center flex-col text-center h-full py-3.5">
          <div className="absolute mb-[390px]">
            <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </div>
          <h1>Sign Up</h1>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            className="bg-[#eee] py-3 px-3.5 my-2"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {/* <label htmlFor="password">Password:</label> */}
          <input
            className="bg-[#eee] py-3 px-3.5 my-2"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {/* <label htmlFor="nickname">Nickname:</label> */}
          <input
            className="bg-[#eee] py-3 px-3.5 my-2"
            id="nickname"
            name="nickname"
            type="text"
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Nickname"
            required
          />
          <button
            className="w-[141px] h-[44px] my-4 rounded-[20px] border border-[#af5858] bg-[#af5858] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform ease-in duration-[80ms] "
            onClick={handleSignUp}
          >
            회원가입
          </button>
          <a href="/login">
            <button
              className="flex justify-center items-center w-[141px] h-[44px] rounded-[20px] border border-[#af5858] bg-[#af5858] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform ease-in duration-[80ms] whitespace-nowrap "
              type="button"
            >
              로그인으로
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

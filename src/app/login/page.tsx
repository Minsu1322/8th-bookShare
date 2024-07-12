'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // const handleKakaoSignIn = async () => {
  //   const supabase = createClient();
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'kakao',
  //     options: {
  //       queryParams: { access_type: 'offline', prompt: 'select_account' },
  //       redirectTo: `http://localhost:3000/api/auth/callback`
  //     }
  //   });
  //   if (error) {
  //     console.error('Kakao Sign In Error:', error.message);
  //     toast.error('카카오 로그인에 실패했습니다.');
  //   } else {
  //     toast.success('카카오 로그인에 성공했습니다.');
  //     router.push('/');
  //   }
  // };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    const supabase = createClient();
    e.preventDefault();

    // 클라이언트 사이드 유효성 검사
    if (!email) {
      return toast.error('이메일을 입력하세요!');
    }
    if (!password) {
      return toast.error('비밀번호를 입력하세요!');
    }

    // 서버에서 이메일 존재 여부 검사
    const { data: users, error: fetchError } = await supabase.from('users').select('id').eq('email', email).single();

    if (!users) {
      return toast.error('존재하지 않는 이메일입니다.');
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (signInError) {
      // 에러 메시지에 따라 처리
      if (signInError.message.toLowerCase().includes('invalid login credentials')) {
        toast.error('비밀번호가 틀렸습니다.');
      } else {
        setError(signInError.message);
      }
    } else {
      toast.success('로그인 되었습니다.');
      router.push('/');
    }
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
          <h1>Login</h1>
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
          <button
            className="w-[141px] h-[44px] my-4 rounded-[20px] border border-[#af5858] bg-[#af5858] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform ease-in duration-[80ms]"
            onClick={handleLogin}
          >
            로그인
          </button>
          <a href="/terms">
            <button
              className="w-[141px] h-[44px] rounded-[20px] border border-[#af5858] bg-[#af5858] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform ease-in duration-[80ms]"
              type="button"
            >
              회원가입
            </button>
          </a>
          {/* <button
            onClick={handleKakaoSignIn}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-4"
          >
            카카오로 로그인
          </button> */}
        </form>
      </div>
    </div>
  );
}

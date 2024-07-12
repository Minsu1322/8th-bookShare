'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TermsPage() {
  const router = useRouter();
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [isOver14, setIsOver14] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setIsOver14(checked);
    setAgreedToTerms(checked);
    setAgreedToMarketing(checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isOver14 || !agreedToTerms) {
      return toast.error('필수 약관에 모두 동의해 주세요!');
    }

    toast.success('약관 동의 완료!');
    router.push('/signup'); // 회원가입 페이지로 이동
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
          <h1 className="mt-2">약관 동의</h1>
          <div className="flex flex-col items-start my-2">
            <div className="flex items-center my-2">
              <input
                className="mr-2"
                id="allChecked"
                name="allChecked"
                type="checkbox"
                checked={allChecked}
                onChange={handleAllChecked}
              />
              <label htmlFor="allChecked">모두 동의합니다</label>
            </div>
            <hr className="w-full border-gray-300 my-2" />
            <div className="flex items-center my-2">
              <input
                className="mr-2"
                id="isOver14"
                name="isOver14"
                type="checkbox"
                checked={isOver14}
                onChange={(e) => setIsOver14(e.target.checked)}
              />
              <label htmlFor="isOver14">(필수) 만 14세 이상입니다.</label>
            </div>
            <div className="flex items-center my-2">
              <input
                className="mr-2"
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="terms_of_use">
                <a href="/terms_of_use" target="_blank" className="text-blue-500 underline">
                  (필수) 서비스 이용약관
                </a>
                에 동의합니다.
              </label>
            </div>
            <div className="flex items-center my-2">
              <input
                className="mr-2"
                id="marketing"
                name="marketing"
                type="checkbox"
                checked={agreedToMarketing}
                onChange={(e) => setAgreedToMarketing(e.target.checked)}
              />
              <label htmlFor="marketing">
                <a href="/marketing" target="_blank" className="text-blue-500 underline">
                  (선택) 마케팅 수신
                </a>
                에 동의합니다.
              </label>
            </div>
          </div>
          <button
            className="w-[141px] h-[44px] my-4 rounded-[20px] border border-[#af5858] bg-[#af5858] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform ease-in duration-[80ms] "
            onClick={handleSubmit}
          >
            확인
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

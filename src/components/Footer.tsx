import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-xs max-w-7xl m-auto py-6">
      <div className="flex gap-9 pb-6 items-center">
        <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 16C35.1826 16 38.2348 17.2643 40.4853 19.5147C42.7357 21.7652 44 24.8174 44 28V42H36V28C36 26.9391 35.5786 25.9217 34.8284 25.1716C34.0783 24.4214 33.0609 24 32 24C30.9391 24 29.9217 24.4214 29.1716 25.1716C28.4214 25.9217 28 26.9391 28 28V42H20V28C20 24.8174 21.2643 21.7652 23.5147 19.5147C25.7652 17.2643 28.8174 16 32 16Z"
            stroke="#1E1E1E"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 18H4V42H12V18Z"
            stroke="#1E1E1E"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
            stroke="#1E1E1E"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <section className="flex gap-2 items-center text-sm font-bold">
          <Link
            href="https://nbcamp.spartacodingclub.kr/?next=%2Fmypage%2Fattendance&utm_source=google&utm_medium=pmax&utm_campaign=nbc&utm_content=backend_java&utm_term=&gad_source=1&gclid=CjwKCAjwnK60BhA9EiwAmpHZwy_tgCwAdAyZE5paMiXUQk4lgk0SKd09K-WeExCd4X_IoTlqpmQ9ghoC-88QAvD_BwE"
            target="_blank"
          >
            <Image src="/images/sparta.png" alt="sparta" width={40} height={40}></Image>
          </Link>
          <div>내일배움캠프 팔팔하조(A08)</div>
        </section>
        <section className="flex gap-3">
          <Link href="https://github.com/Minsu1322/8th-bookShare" target="_blank">
            <Image src="/images/github.png" alt="github" width={30} height={30}></Image>
          </Link>
          <Link href="https://www.notion.so/teamsparta/A08-6d5377e0fbc943d9af66659c3c83fce5" target="_blank">
            <Image src="/images/notion.png" alt="notion" width={30} height={30}></Image>
          </Link>
        </section>
      </div>
      <div className="pb-4">팀스파르타 ㈜ 사업자 정보</div>
      <div>
        대표자: 이범규 | 사업자 등록번호: 783-86-01715 | 통신판매업 신고번호: 2020-서울강남-02300 | 평생교육시설
        신고번호: 제 661호
      </div>
      <div className="pb-4">
        주소: 서울특별시 강남구 테헤란로44길 8 12층 | 이메일: contact@teamsparta.co | 전화: 1522-8016
      </div>
      <div>Copyright © 2024 TEAMSPARTA. All rights reserved.</div>
    </footer>
  );
}

'use client';
import React from 'react';

export default function marketingPage() {
  return (
    <div className="w-full max-w-[1192px] my-0 mx-auto py-[50px] px-0 ">
      <h2 className="text-[32px] font-[700] mb-[24px] pb-[20px] text-center">마케팅정보수신동의</h2>
      <div className="text-[14px]">
        <div className="mb-10">
          <p className="text-[16px] font-[700] mb-5">1.개인정보의 수집, 이용 목적</p>
          <p className="mb-3">- 책In 운영 안내, 뉴스레터 발송, 맞춤형 서비스 권유</p>
        </div>
        <div className="mb-10">
          <p className="text-[16px] font-[700] mb-5">2.수집하는 개인정보의 항목</p>
          <p className="mb-3">- 이름, 휴대전화, 이메일</p>
        </div>
        <div className="mb-10">
          <p className="text-[16px] font-[700] mb-5">
            3.개인정보의 보유 및 이용기간 : <span className="text-red-600">회원 탈퇴 시까지</span>
          </p>
          <p className="mb-3">※ 단, 법률이 정하는 바에 따라 탈퇴 후에도 일정기간 보유할 수 있습니다.</p>
        </div>
        <div className="mb-10">
          <p className="text-[16px] font-[700] mb-5">
            4.개인정보의 마케팅 활용 동의를 거부하시더라도 회원 가입 시 제한은 없습니다. 다만, 마케팅 활용 서비스 안내
            및 참여에 제한이 있을 수 있습니다.
          </p>
          <p className="mb-3">
            {' '}
            ※ 책In는 별도의 동의를 받거나 법률에 특별한 규정이 있는 경우를 제외하면 제3자에게 고객님의 개인정보를
            제공하지 않으며, 상기 안내해드린 개인정보 수집 동의 범위를 초과하여 고객님의 개인정보를 활용하지 않습니다.
          </p>
        </div>
        <div className="mb-10">
          <p className="text-[16px] font-[700] mb-5">5. 개인정보 수집· 이용 거부권 및 불이익</p>
          <p className="mb-3">
            {' '}
            - 이용자는 위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 동의를 거부할 경우, 마케팅 정보
            수신 서비스를 이용 하실 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

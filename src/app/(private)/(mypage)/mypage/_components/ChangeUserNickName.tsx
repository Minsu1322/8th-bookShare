'use client';
import Button from '@/components/ButtonComponent';
import { createClient } from '@/utils/supabase/client';
import React, {  useState } from 'react';
import { toast } from 'react-toastify';

const ChangeUserNickName = ({ info }: { info: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [changeInfo, setChangeInfo] = useState<string>(info); //초기값을 설정해야됨 props로
  const supabase = createClient();

  //// 고민거리: info가 닉네임일수있고 이메일 일수있다 이거를 어떻게하면 구분할수있을까?
  //TODO: 아이디 변경 ✅, 비밀번호 변경✅, 회원탈퇴 , 댓글 리스트 나열 및 페이지 네이션

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);

    if (changeInfo.trim() === '') {
      setChangeInfo(info);
      toast.warning(`빈칸으로 변경할 수 없습니다.`, {
        position: 'top-right'
      });
      return;
    }
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        throw new Error('사용자 정보를 가져오는 중 오류 발생');
      }
      const userId = userData.user.id; //f7bb7bd7-a9bd-4d3e-8cfb-91adf7c749a2 으로 출력됨

      const { error } = await supabase.from('users').update({ nickname: changeInfo }).eq('id', userId).single();

      if (error) {
        throw error;
      }
      const { error: authError } = await supabase.auth.updateUser({
        data: { nickname: changeInfo }
      });

      if (authError) {
        throw authError;
      }
      toast.success(`닉네임이 성공적으로 변경되었습니다.`, {
        position: 'top-right'
      });
    } catch (error) {
      console.error(`'닉네임 업데이트 중 오류 발생:`, error);
      toast.error(`'닉네임 업데이트 중 오류가 발생했습니다.`, {
        position: 'top-right'
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChangeInfo(e.target.value);
  };

  
  return (
    <div className="flex items-center justify-between">
      {isEditing ? (
        <input
          type="text"
          value={changeInfo}
          className="text-base outline-double pl-2 py-1 rounded block box-border"
          onChange={handleChange}
          maxLength={25}
        />
      ) : (
        <p className="text-base">{changeInfo}</p>
      )}
      <Button
        label={isEditing ? '저장' : '변경'}
        style={'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold'}
        onClick={isEditing ? handleSave : handleEdit}
      />
    </div>
  );
};

export default ChangeUserNickName;

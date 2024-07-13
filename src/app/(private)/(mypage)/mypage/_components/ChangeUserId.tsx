'use client';
import Button from '@/components/ButtonComponent';
import { createClient } from '@/utils/supabase/client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const ChangeUserId = ({ info }: { info: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const changeInfoRef = useRef<string>(info);
  const supabase = createClient();

  const emailRegex = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);

  const isEmail = useCallback(
    (checkEmail: string) => {
      return emailRegex.test(checkEmail);
    },
    [emailRegex]
  );

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);

    if (changeInfoRef.current.trim() === '') {
      // setChangeInfo(info);
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
      const userId = userData.user.id;
      if (isEmail(changeInfoRef.current)) {
        const { data: existingUser, error: emailCheckError } = await supabase
          .from('users')
          .select('*')
          .eq('email', changeInfoRef.current)
          .single();

        if (existingUser) {
          toast.error(`변경사항 없거나 이미 사용 중인 이메일 주소입니다. 다른 이메일 주소를 입력해주세요.`, {
            position: 'top-right'
          });
          return;
        }
        const { error: authError } = await supabase.auth.updateUser({
          email: changeInfoRef.current
        });
        if (authError) {
          throw authError;
        }

        toast.success(
          `인증메일 발송완료. 메일내 링크 클릭 후 이메일 변경완료됩니다.(이메일 인증하지않을 경우 변경불가합니다.)`,
          {
            position: 'top-right'
          }
        );
      } else {
        toast.warning(`이메일 형식이 아닙니다.`, {
          position: 'top-right'
        });
      }
    } catch (error) {
      console.error(`이메일 업데이트 중 오류 발생:`, error);
      toast.error(`이메일 업데이트 중 오류가 발생했습니다.`, {
        position: 'top-right'
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeInfoRef.current = e.target.value;
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'USER_UPDATED') {
        setTimeout(async () => {
          const { data } = await supabase.auth.getSession();
          const userId = data.session?.user.id;
          if (userId || isEmail(changeInfoRef.current)) {
            const { error } = await supabase
              .from('users')
              .update({ email: changeInfoRef.current })
              .eq('id', userId as string);
            if (error) {
              throw error;
            }
          }
        }, 0);
      }
    });
  }, [supabase, isEmail]);

  return (
    <div className="flex items-center justify-between">
      {isEditing ? (
        <input
          type="text"
          // value={changeInfo}
          placeholder={changeInfoRef.current}
          className="text-base outline-double pl-2 py-1 rounded block box-border"
          onChange={handleChange}
          maxLength={25}
        />
      ) : (
        <p className="text-base">{changeInfoRef.current}</p>
      )}
      <div>
        {isEditing && (
          <Button
            label="취소"
            style={
              'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition mr-3'
            }
            onClick={() => setIsEditing(false)}
          />
        )}
        <Button
          label={isEditing ? '저장' : '변경'}
          style={
            'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition'
          }
          onClick={isEditing ? handleSave : handleEdit}
        />
      </div>
    </div>
  );
};

export default ChangeUserId;

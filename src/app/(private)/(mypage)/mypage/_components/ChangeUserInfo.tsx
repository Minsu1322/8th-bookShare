'use client';
import Button from '@/components/Button';
import React, { useState } from 'react';

const ChangeUserInfo = ({ info }: {info:string}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(info); //초기값을 설정해야됨 props로
  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      {isEditing ? (
        <input
          type="text"
          value={info}
          className="text-base outline-double pl-2 py-1 rounded block box-border"
          onChange={handleChange}
          maxLength={10}
        />
      ) : (
        <p className="text-base">{info}</p>
      )}
      <Button
        label={isEditing ? '저장' : '변경'}
        style={'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold'}
        onClick={isEditing ? handleSave : handleEdit}
      />
    </div>
  );
};

export default ChangeUserInfo;

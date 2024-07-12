import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react';

import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { toast } from 'react-toastify';
import { createClient } from '@/utils/supabase/client';
import { AuthError } from '@supabase/supabase-js';

const ChangePassWord = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visibility, setVisibility] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [changePassWord, setChangePassWord] = useState({
    newChangePassWord: '',
    confirmChangePassWord: ''
  });
  const supabase = createClient();
  const toggleVisibility = (item: keyof typeof visibility) => {
    setVisibility((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassWord({
      ...changePassWord,
      [e.target.name]: e.target.value
    });
  };
  const handleSaveNewPassWord = async (onClose: () => void) => {
    // console.log(changePassWord.confirmChangePassWord)
    // console.log(changePassWord.newChangePassWord)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (changePassWord.newChangePassWord.trim() === '' || changePassWord.confirmChangePassWord.trim() === '') {
      toast.error('모든 빈칸 채워주세요');
      return;
    }
    if (!passwordRegex.test(changePassWord.newChangePassWord)) {
      toast.error('비밀번호는 8자리 이상이어야 하며, 알파벳, 숫자 및 특수문자를 포함해야 합니다.');
      return;
    }
    if (changePassWord.newChangePassWord !== changePassWord.confirmChangePassWord) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: changePassWord.newChangePassWord
      });
      if (error) {
        throw error;
      }

      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      onClose();
    } catch (error) {
      if (error instanceof AuthError) {
        console.error(`데이터 베이스에 비밀번호 갱신 실패 ${error.message}`);
      }
      console.error('DB에 비밀번호 갱신 요청 시 예상 치 못한 Error발생 했습니다.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">비밀번호 변경</ModalHeader>
              <ModalBody>
                <Input
                  label="새로운 비밀번호"
                  placeholder="새로운 비밀번호 입력하세요"
                  type={visibility.newPassword ? 'text' : 'password'}
                  variant="bordered"
                  name="newChangePassWord"
                  maxLength={15}
                  onChange={handleChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => toggleVisibility('newPassword')}
                    >
                      {visibility.newPassword ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <Input
                  label="비밀번호 확인"
                  placeholder="새로운 비밀번호 다시 입력하세요"
                  type={visibility.confirmPassword ? 'text' : 'password'}
                  variant="bordered"
                  name="confirmChangePassWord"
                  maxLength={15}
                  onChange={handleChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => toggleVisibility('confirmPassword')}
                    >
                      {visibility.confirmPassword ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSaveNewPassWord(onClose)}>
                  재설정
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={onOpen}
        className="bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold"
        size="sm"
      >
        변경
      </Button>
    </>
  );
};

export default ChangePassWord;

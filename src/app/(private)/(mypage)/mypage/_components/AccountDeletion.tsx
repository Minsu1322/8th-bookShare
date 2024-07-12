import { logout } from '@/app/logout/actions';
import ButtonComponent from '@/components/ButtonComponent';
import { createClient } from '@/utils/supabase/client';
import { AuthError } from '@supabase/supabase-js';
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
const AccountDeletion = ({ userInfo }: { userInfo: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = createClient();

  const deleteUser = async () => {
    const user_id = userInfo;
    try {
      const { data, error } = await supabase.rpc('delete_user', { user_id });
      if (error) {
        throw error;
      }
      onClose();
      await logout();
    } catch (error) {
      if (error instanceof AuthError) {
        console.error('회원탈퇴 실패==>', error.message);
      }
      console.error('회원탈퇴 시 예상치 못한 에러 발생');
    }
  };
  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} shouldBlockScroll={false} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">재확인</ModalHeader>
              <ModalBody>
                <p>회원탈퇴 하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={deleteUser}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        // variant="flat"
        // color="warning"
        onPress={onOpen}
        className="bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition"
        size="sm"
      >
        탈퇴
      </Button>
      {/* <ButtonComponent
        label={'탈퇴'}
        style={
          'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition'
        }
        onClick={deleteUser}
      /> */}
    </>
  );
};

export default AccountDeletion;

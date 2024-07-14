import { createClient } from '@/utils/supabase/client';
import { AuthError } from '@supabase/supabase-js';
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AccountDeletion = ({ userInfo }: { userInfo: string }): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = createClient();
  const router = useRouter();

  const deleteUserLogout = async () => {
    await supabase.auth.signOut();
    toast.success('회원탈퇴 되었습니다.');
    router.push('/');
  };

  const deleteUser = async (): Promise<void> => {
    const user_id = userInfo;
    try {
      const { data, error } = await supabase.rpc('delete_user', { user_id });
      if (error) {
        throw error;
      }
      onClose();
      await deleteUserLogout();
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
                <p>정말로 회원탈퇴 하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={deleteUser}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={onOpen}
        className="bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition"
        size="sm"
      >
        탈퇴
      </Button>
    </>
  );
};

export default AccountDeletion;

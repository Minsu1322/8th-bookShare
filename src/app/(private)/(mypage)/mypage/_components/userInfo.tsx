import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import ButtonComponent from '@/components/ButtonComponent';
import { UserInfoType } from '@/types/userInfo.type';
import ChangePassWord from './ChangePassWord';
import ChangeUserId from './ChangeUserId';
import ChangeUserNickName from './ChangeUserNickName';
import { getDiffieHellman } from 'crypto';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/logout/actions';
import { AuthError } from '@supabase/supabase-js';

interface UserInfoPropsType {
  userInfo: UserInfoType;
}
const UserInfo = ({ userInfo }: UserInfoPropsType) => {
  const supabase = createClient();

  const deleteUser = async () => {
    const user_id = userInfo.id;
    try {
      const { data, error } = await supabase.rpc('delete_user', { user_id });
    if (error) {
      throw error
    }
    await logout();
    } catch (error) {
      if(error instanceof AuthError){
        console.error('회원탈퇴 실패==>',error.message)
      }
      console.error("회원탈퇴 시 예상치 못한 에러 발생")
    }
  };
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-center text-lg h-20">분류</TableColumn>
        <TableColumn className="text-lg text-center h-20">내용</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1" className="h-20">
          <TableCell className="text-center text-lg font-bold">회원번호</TableCell>
          <TableCell className="text-base">{userInfo?.id.split('-')[0].toUpperCase()}</TableCell>
        </TableRow>
        <TableRow key="2" className="h-20">
          <TableCell className="text-center text-lg font-bold">닉네임</TableCell>
          <TableCell className="w-2/3">
            <ChangeUserNickName info={userInfo.nickname} />
          </TableCell>
        </TableRow>
        <TableRow key="3" className="h-20">
          <TableCell className="text-center text-lg font-bold">아이디</TableCell>
          <TableCell>
            <ChangeUserId info={userInfo.email} />
          </TableCell>
        </TableRow>
        <TableRow key="4" className="h-20">
          <TableCell className="text-center text-lg font-bold">비밀번호</TableCell>
          <TableCell>
            <ChangePassWord />
          </TableCell>
        </TableRow>
        <TableRow key="5" className="h-20">
          <TableCell className="text-center text-lg font-bold">회원탈퇴</TableCell>
          <TableCell>
            <ButtonComponent
              label={'탈퇴'}
              style={'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold'}
              onClick={deleteUser}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserInfo;

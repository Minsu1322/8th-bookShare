import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import Button from '@/components/Button';
import ChangeUserInfo from './ChangeUserInfo';

const UserInfo = () => {
  // const data = getUserInfo();
  // console.log(data);
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-center text-lg h-20">분류</TableColumn>
        <TableColumn className="text-lg text-center h-20">내용</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1" className="h-20">
          <TableCell className="text-center text-lg font-bold">회원번호</TableCell>
          <TableCell className="text-base">ABCD123456789</TableCell>
        </TableRow>
        <TableRow key="2" className="h-20">
          <TableCell className="text-center text-lg font-bold">닉네임</TableCell>
          <TableCell className="w-2/3">
            <ChangeUserInfo info={'르탄이'}/>
          </TableCell>
        </TableRow>
        <TableRow key="3" className="h-20">
          <TableCell className="text-center text-lg font-bold">아이디</TableCell>
          <TableCell>
          <ChangeUserInfo info={'result1234'}/>
          </TableCell>
        </TableRow>
        <TableRow key="4" className="h-20">
          <TableCell className="text-center text-lg font-bold">비밀번호</TableCell>
          <TableCell>
            <Button label={'변경'} style={'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold'} />
          </TableCell>
        </TableRow>
        <TableRow key="5" className="h-20">
          <TableCell className="text-center text-lg font-bold">회원탈퇴</TableCell>
          <TableCell>
            <Button label={'탈퇴'} style={'bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold'} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserInfo;

'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, Pagination, Skeleton, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { UserInfoPropsType } from '@/types/userInfo.type';
import Link from 'next/link';
import CoverImg from './CoverImg';
import { Mycommentlist } from '@/types/mypageCommentslist.type';

const CommentList = ({ userInfo }: UserInfoPropsType): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const supabase = createClient();
  const {
    data: myCommentslist,
    isPending,
    isError
  } = useQuery<Mycommentlist, Error, Mycommentlist, [string, number]>({
    queryKey: ['myComments', currentPage],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('user_id', userInfo.id)
          .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
        if (error) {
          throw error;
        }

        const { count: total } = await supabase
          .from('comments')
          .select('*', { count: 'exact' })
          .eq('user_id', userInfo.id);

        return { data, total } as Mycommentlist;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Supabase에서 에러 발생:', error);
        }
        console.error('예상치 못한 에러 발생:', error);
        throw error;
      }
    },
    enabled: !!userInfo.id
  });
  const totalPages: number = Math.ceil(Number(myCommentslist?.total) / pageSize) || 1;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  if (isPending) return <Spinner className="w-[950px] h-[670px] mx-auto" />;
  if (isError) return <div>error</div>;

  return (
    <>
      {myCommentslist.data.length > 0 ? (
        <ul className="grid grid-cols-4 gap-4 h-[520px]">
          {myCommentslist.data.map((item, index) => (
            <li key={index}>
              {isPending ? (
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              ) : (
                <Link href={`/${item.post_id}`}>
                  <Card isFooterBlurred className="col-span-12 sm:col-span-6 h-[250px]">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <h5 className="text-white font-medium text-xl mb-1 h-[30px] truncate w-full">{item.title}</h5>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.content || '' }}
                        className="text-tiny text-white/60 uppercase font-bold w-full text-ellipsis overflow-hidden line-clamp-6"
                      />
                    </CardHeader>
                    <CoverImg postId={item.post_id} />
                    <CardFooter className="absolute bg-white/20 bottom-0 border-t-1 border-zinc-100/80 z-10 justify-between">
                      <div>
                        <p className="text-black text-tiny font-bold">{userInfo.nickname}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p>댓글 남긴 기록이 없습니다.</p>
            <Link href="/">
              <button className="mt-4 bg-[#af5858] text-white w-[60px] h-[30px] rounded-full text-xs font-bold hover:bg-opacity-80 transition rounded-full">
                홈으로
              </button>
            </Link>
          </div>
        </div>
      )}
      <Pagination
        isCompact
        showControls
        total={totalPages}
        initialPage={currentPage}
        className="mx-auto w-min"
        onChange={handlePageChange}
      />
    </>
  );
};

export default CommentList;

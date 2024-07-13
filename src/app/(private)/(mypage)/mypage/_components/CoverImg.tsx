'use client';
import { Image } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton } from '@nextui-org/react';
interface PostIdProps {
  postId: string;
}

const CoverImg = ({ postId }: PostIdProps): JSX.Element => {
  const {
    data: coverImg,
    isPending,
    isError
  } = useQuery<string, Error, string, string[]>({
    queryKey: ['coverImg', postId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/AladinApi/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cover image');
        }
        const data = await response.json();
        return data.item[0].cover; // 실제 이미지 URL을 사용
      } catch (error) {
        if (error instanceof Error) {
          throw new Error('cover image fetch 오류', error);
        }
        throw new Error('커버 이미지 로드중 예상치 못한 오류 발생');
      }
    },
    enabled: !!postId
  });
  if (isError) return <div>error</div>;
  return (
    <>
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
        <div className="relative w-full h-full">
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 -translate-y-6 object-cover w-full h-full"
            src={coverImg || '/noImg.png'}
            width={50}
            height={50}
          />
          <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        </div>
      )}
    </>
  );
};

export default CoverImg;

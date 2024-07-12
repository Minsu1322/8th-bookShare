'use client';
import { Image } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton } from '@nextui-org/react';
interface PostIdProps {
  postId: string | null;
}

const CoverImg = ({ postId }: PostIdProps) => {
  const {
    data: coverImg,
    isPending,
    isError
  } = useQuery({
    queryKey: ['coverImg', postId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/AladinApi/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cover image');
        }
        const data = await response.json();
        return data.item[0]; // 실제 이미지 URL을 사용
      } catch (error) {
        console.error('Error fetching cover image:', error);
      }
    }
  });
  //   console.log(coverImg);
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
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 -translate-y-6 object-cover w-full h-full"
          src={coverImg.cover || '/noImg.png'}
          width={50}
          height={50}
        />
      )}
    </>
  );
};

export default CoverImg;

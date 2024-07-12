'use client';
import Comment from '@/components/comment/Comment';
import CommentList from '@/components/comment/CommentList';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const fetchAladinDetailPage = async (isbn13: string) => {
  const apiUrl = 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/api/AladinApi/${isbn13}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const MainDetail = ({ params }: { params: { id: string } }) => {
  const { id: paramsId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ['aladinDetailPage', paramsId],
    queryFn: () => fetchAladinDetailPage(paramsId),
    staleTime: 300000
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        Loading...
      </div>
    );
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;

  const items = data.item[0] || {};
  console.log(items);
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-8">
          {/* 좌측 책 표지 이미지 */}
          <div className="md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
            <Image
              src={items.cover}
              alt={items.title}
              className="rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              height={500}
              width={500}
              quality={100}
              objectFit="cover"
            />
          </div>

          {/* 우측 책 정보 */}
          <div className="md:w-2/3 md:pl-8 text-lg flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{items.title}</h1>
              <p className="text-2xl mb-2 text-gray-700">{items.author}</p>
              <p className="text-md text-gray-600 mb-2 font-semibold">
                출판사: <span className="text-md font-normal">{items.publisher}</span>
              </p>
              <p className="text-md text-gray-600 mb-2 font-semibold">{items.categoryName}</p>

              <p className="text-md font-semibold text-gray-600 mb-4">
                등급:{' '}
                {items.adult ? (
                  <span className="text-red-600 border border-red-600 rounded px-2">성인</span>
                ) : (
                  <span className="text-blue-600 border border-blue-600 rounded px-2">일반</span>
                )}
              </p>

              <p className="text-md font-semibold mb-4">
                줄거리: <span className="font-normal text-gray-700">{items.description}</span>
              </p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-semibold mb-4">{items.priceStandard.toLocaleString()}원</p>
              <button className="w-full w-auto bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:bg-blue-600">
                구매하기
              </button>
            </div>
          </div>
        </div>

        <div className="border-2 mt-8 border-gray-300 border-dashed min-h-72 h-auto w-auto rounded-lg p-4 bg-gray-100">
          <CommentList />
        </div>
      </div>

      <Comment />
    </>
  );
};

export default MainDetail;

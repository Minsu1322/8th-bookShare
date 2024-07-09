'use client';
import Comment from '@/components/comment/Comment';
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const items = data.item[0] || {};
  console.log(items);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* 좌측 책 표지 이미지 */}
          <div className="w-1/3">
            <img
              src={items.cover}
              alt={items.title}
              className="w-full h-auto object-cover"
              style={{ height: '100%' }}
            />
          </div>

          {/* 우측 책 정보 */}
          <div className="w-2/3 pl-4 py-3 text-lg flex flex-col justify-between">
            <div className="flex-grow flex flex-col space-y-16 ml-4">
              <h1 className="text-3xl font-bold mb-2">{items.title}</h1>
              <p className="text-lg mb-1">{items.author}</p>
              <p className="text-md text-gray-600 mb-1 font-semibold">
                출판사: <span className="text-md font-normal">{items.publisher}</span>
              </p>
              <p className="text-md text-gray-600 mb-1 font-semibold">{items.categoryName}</p>

              <p className="text-md font-semibold text-gray-600 mb-1">
                등급:{' '}
                {items.adult ? (
                  <span className="text-red-600 border border-red-600 rounded px-2">성인</span>
                ) : (
                  <span className="text-blue-600 border border-blue-600 rounded px-2">일반</span>
                )}
              </p>

              <p className="text-md font-semibold">
                줄거리: <span className="font-normal mb-2 text-md">{items.description}</span>
              </p>

              <p className="text-lg font-semibold mb-2">{items.priceStandard.toLocaleString()}원</p>
              <button className="w-fit bg-blue-500 text-white px-4 py-2 rounded">구매하기</button>
            </div>
          </div>
        </div>
        <div className="border-2 border-orange-500 border-dashed min-h-72	h-auto w-auto">d</div>
      </div>
      <Comment />
    </>
  );
};

export default MainDetail;

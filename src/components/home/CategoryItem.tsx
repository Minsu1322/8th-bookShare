import { Item } from '@/types/book.type';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

interface CategoryItemProps {
  item: Item;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default function CategoryItem({ item }: CategoryItemProps) {
  const truncatedDescription: string = truncateText(item.description, 100);
  const truncatedTitle: string = truncateText(item.title, 18);
  const truncatedAuthor: string = truncateText(item.author, 16);

  return (
    <Card shadow="sm" isPressable className="h-[500px]">
      <CardBody className="overflow-visible p-0 m-auto w-[250px] h-[300px]">
        <div className='w-full h-[300px]'>
          <Image
            src={item.cover}
            alt="책 표지"
            width={50}
            height={50}
            className="w-full h-full"
          />
        </div>
      </CardBody>
      <CardFooter className="text-sm flex flex-col justify-start">
        <b className="absolute h-[22px]">{truncatedTitle}</b>
        <p className="mt-7 h-[130px]">{truncatedDescription || '설명 없음'}</p>
        <div className="mt-2 flex justify-between w-full">
          <div>
            <p className="text-xs">저자: {truncatedAuthor}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

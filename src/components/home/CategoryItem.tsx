import { Item } from '@/types/book.type';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

interface CategoryItemProps {
  item: Item;
  isForeign?: boolean | undefined;
}

const truncateText = (isForeign: boolean | undefined, text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const newText: string = text.substring(0, maxLength);
  if (isForeign) {
    const englishCharCount: number = (newText.match(/[a-zA-Z]/g) || []).length;
    if (englishCharCount > 10) return newText + text.substring(maxLength, maxLength + 8) + '...';
    else return newText + '...';
  } else return newText + '...';
};

export default function CategoryItem({ item, isForeign }: CategoryItemProps) {
  const truncatedTitle: string = truncateText(isForeign, item.title, 18);
  const truncatedDescription: string = truncateText(isForeign, item.description, 100);
  const truncatedAuthor: string = truncateText(isForeign, item.author, 16);

  return (
    <Card shadow="sm" isPressable className="h-[500px]">
      <CardBody className="overflow-visible p-0 m-auto w-[250px] h-[300px]">
        <div className="w-full h-[300px]">
          <Image src={item.cover} alt="책 표지" width={200} height={200} className="w-full h-full" />
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

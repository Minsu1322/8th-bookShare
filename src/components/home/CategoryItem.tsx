import { Item } from '@/types/book.type';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

interface CategoryItemProps {
  item: Item;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default function CategoryItem({ item }: CategoryItemProps) {
  const truncatedDescription: string = truncateText(item.description, 100);
  const truncatedTitle: string = truncateText(item.title, 40);
  const truncatedAuthor: string = truncateText(item.author, 10);

  return (
    <Card shadow="sm" isPressable onPress={() => console.log('나중에 링크 이동으로 구현하기')}>
      <CardBody className="overflow-visible p-0 m-auto">
        <Image src={item.cover} alt="책 표지" width="100%" className="object-cover max-h-[300px] object-top" />
      </CardBody>
      <CardFooter className="text-sm flex flex-col justify-start">
        <b>{truncatedTitle}</b>
        <p>{truncatedDescription}</p>
        <div className="mt-2 flex justify-between w-full">
          <div className="flex gap-2">
            <Image src="/images/heart.png" alt="heart" width={30}></Image>
            <Image src="/images/comment.png" alt="comment" width={30}></Image>
          </div>
          <div className="flex items-center">
            <p className="text-xs">저자: {truncatedAuthor}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

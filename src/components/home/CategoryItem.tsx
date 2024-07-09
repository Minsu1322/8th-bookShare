import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

export default function CategoryItem() {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log('나중에 링크 이동으로 구현하기')}>
      <CardBody className="overflow-visible p-0">
        <Image src="/images/example.jpg" alt="임시이미지" width="100%" />
      </CardBody>
      <CardFooter className="text-sm flex flex-col justify-start">
        <b>제목</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
        <div className="mt-2 flex justify-between w-full">
          <div className="flex gap-2">
            <Image src="/images/heart.png" alt="heart" width={30}></Image>
            <Image src="/images/comment.png" alt="comment" width={30}></Image>
          </div>
          <div className="flex items-center">
            <p className="text-xs">저자: 르탄이</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

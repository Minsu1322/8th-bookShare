import React from 'react';
import { Card, CardHeader, CardFooter, Image, Pagination } from '@nextui-org/react';
const test = [
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' },
  { title: 'javascript deep dive', comment: '한번 읽어본 사람들이 모두 추천하는책이다.', author: '르탄이' }
];
const CommentList = () => {
  return (
    <>
      <ul className="grid grid-cols-4 gap-4">
        {test.map((item, index) => (
          <li key={index}>
            <Card isFooterBlurred className="col-span-12 sm:col-span-6 h-[250px]">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                <h4 className="text-black font-medium text-2xl">Acme camera</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 -translate-y-6 object-cover"
                src="https://nextui.org/images/card-example-6.jpeg"
              />
              <CardFooter className="absolute bg-white/20 bottom-0 border-t-1 border-zinc-100/80 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">Available soon.</p>
                  <p className="text-black text-tiny">Get notified.</p>
                </div>
                <p>지은이 : {item.author}</p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination isCompact showControls total={10} initialPage={1} className='mx-auto w-min mt-[30px]'/>
    </>
  );
};

export default CommentList;

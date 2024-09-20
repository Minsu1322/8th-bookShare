'use client';

import { Navbar, NavbarContent, NavbarItem, Pagination } from '@nextui-org/react';
import CategoryItem from './CategoryItem';
import { Book, Item } from '@/types/book.type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SkeletonItem from './SkeletonItem';
import Link from 'next/link';

export default function Category() {
  const [queryType, setQueryType] = useState<string>('Bestseller');
  const [page, setPage] = useState<number>(1);

  const {
    data: bookItem,
    isPending,
    error
  } = useQuery<Item[], Error>({
    queryKey: ['books', queryType, page],
    queryFn: async ({ queryKey }) => {
      const queryType = queryKey[1];
      const page = queryKey[2];

      const response: Response = await fetch(`/api/AladinApi?QueryType=${queryType}&page=${page}`);
      const data: Book = await response.json();
      const item: Item[] = data.item;

      return item;
    },
    staleTime: 30000
  });

  return (
    <section className="max-w-7xl m-auto">
      <Navbar maxWidth="full" position="static">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem isActive={queryType === 'Bestseller'}>
            <button
              onClick={() => {
                setQueryType('Bestseller');
                setPage(1);
              }}
            >
              베스트셀러
            </button>
          </NavbarItem>
          <NavbarItem isActive={queryType === 'ItemNewAll'}>
            <button
              onClick={() => {
                setQueryType('ItemNewAll');
                setPage(1);
              }}
            >
              새로 나온 책
            </button>
          </NavbarItem>
          <NavbarItem isActive={queryType === 'ItemNewSpecial'}>
            <button
              onClick={() => {
                setQueryType('ItemNewSpecial');
                setPage(1);
              }}
            >
              화제의 책
            </button>
          </NavbarItem>
          <NavbarItem isActive={queryType === 'BlogBest'}>
            <button
              onClick={() => {
                setQueryType('BlogBest');
                setPage(1);
              }}
            >
              베스트 예감
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-5">
        {isPending
          ? Array.from({ length: 10 }).map((_, index) => <SkeletonItem key={index} />)
          : bookItem?.map((item) => (
              <Link key={item.isbn13} href={`/${item.isbn13}`}>
                <CategoryItem key={item.itemId} item={item} />
              </Link>
            ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          isCompact
          showControls
          total={queryType === 'BlogBest' ? 10 : 100}
          page={page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </section>
  );
}

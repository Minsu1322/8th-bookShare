'use client';

import CategoryItem from '@/components/home/CategoryItem';
import SkeletonItem from '@/components/home/SkeletonItem';
import useGenres from '@/hooks/useGenres';
import { Book, Item } from '@/types/book.type';
import { Genre } from '@/types/genre.type';
import { button, Card, CardBody, Navbar, NavbarContent, NavbarItem, Pagination, Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Key, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: { categoryId: number };
}

const ITEMS_PER_PAGE: number = 50;

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params;

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genreData, setGenreData] = useState<Genre[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(categoryId.toString());

  const router = useRouter();

  const { koreanGenres, foreignGenres, ebookGenres } = useGenres();

  const { data, isPending, error, refetch } = useQuery<{ item: Item[]; totalData: number }, Error>({
    queryKey: ['books', selectedTab, page],
    queryFn: async ({ queryKey }) => {
      const selectedTab = queryKey[1];
      const page = queryKey[2];

      const response = await fetch(`/api/AladinApi?QueryType=ItemEditorChoice&CategoryId=${selectedTab}&page=${page}`);
      const data: Book = await response.json();
      const totalData: number = data.totalResults;
      const item: Item[] = data.item;

      return { item, totalData };
    }
  });

  useEffect(() => {
    if (data && koreanGenres && foreignGenres && ebookGenres && totalPages === 1) {
      setTotalPages(Math.min(Math.ceil(data.totalData / ITEMS_PER_PAGE), 20));
      if (koreanGenres.find((genre) => genre.id == categoryId)) setGenreData(koreanGenres);
      else if (foreignGenres.find((genre) => genre.id == categoryId)) setGenreData(foreignGenres);
      else setGenreData(ebookGenres);
    }
  }, [data, koreanGenres, foreignGenres, ebookGenres, totalPages, categoryId]);

  useEffect(() => {
    if (categoryId && koreanGenres && foreignGenres && ebookGenres) {
      const selectedGenre =
        koreanGenres.find((genre) => genre.id == categoryId) ||
        foreignGenres.find((genre) => genre.id == categoryId) ||
        ebookGenres.find((genre) => genre.id == categoryId);

      if (selectedGenre) setSelectedTab(selectedGenre.id.toString());
    }
  }, [categoryId, koreanGenres, foreignGenres, ebookGenres]);

  useEffect(() => {
    if (selectedTab) refetch();
  }, [selectedTab, refetch]);

  const handleTabClick = (key: Key) => {
    console.log(key);
    console.log('handleTabClick 호출');
    setSelectedTab(key.toString());
    // router.push(`/category/${key}`, undefined, {
    //   shallow: true
    // });
    window.history.pushState(null, '', `/category/${key}`);
  };

  console.log(data);

  return (
    <section className="max-w-7xl m-auto mt-6">
      <div className="flex w-full flex-col">
        {/* <nav className="border border-2 rounded-lg">네비바</nav> */}
        {/* <Tabs
          aria-label="Dynamic tabs"
          items={genreData || []}
          selectedKey={selectedTab}
          onSelectionChange={handleTabClick}
          isVertical={true}
        >
          {(item) => {
            return (
              <Tab key={item.id} title={item.label} id={item.id.toString()}>
                <Card shadow="none" className="px-[1px]"> */}
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-5" style={{ rowGap: '30px' }}>
          {isPending
            ? Array.from({ length: 50 }).map((_, index) => <SkeletonItem key={index} />)
            : data?.item.map((item) => (
                <Link key={item.isbn13} href={`https://book-in-8th/${item.isbn13}`}>
                  <CategoryItem key={item.itemId} item={item} />
                </Link>
              ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination isCompact showControls total={totalPages} page={page} onChange={(page) => setPage(page)} />
        </div>
        {/* </Card>
              </Tab>
            );
          }}
        </Tabs> */}
      </div>
    </section>
  );
}

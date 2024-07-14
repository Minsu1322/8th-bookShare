'use client';

import CategoryItem from '@/components/home/CategoryItem';
import SkeletonItem from '@/components/home/SkeletonItem';
import useGenres from '@/hooks/useGenres';
import { Book, Item } from '@/types/book.type';
import { Genre } from '@/types/genre.type';
import { Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface CategoryPageProps {
  params: { categoryId: number };
}

const ITEMS_PER_PAGE: number = 40;

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params;

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genreData, setGenreData] = useState<Genre[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(categoryId.toString());

  const { koreanGenres, foreignGenres, ebookGenres } = useGenres();

  const { data, isPending, refetch } = useQuery<{ item: Item[]; totalData: number }, Error>({
    queryKey: ['books', selectedTab, page],
    queryFn: async ({ queryKey }) => {
      const selectedTab = queryKey[1];
      const page = queryKey[2];

      const response: Response = await fetch(
        `/api/AladinApi?QueryType=ItemEditorChoice&CategoryId=${selectedTab}&page=${page}`
      );
      const data: Book = await response.json();
      const totalData: number = data.totalResults;
      const item: Item[] = data.item;

      return { item, totalData };
    }
  });

  useEffect(() => {
    if (data && koreanGenres && foreignGenres && ebookGenres && totalPages === 1) {
      setTotalPages(Math.min(Math.ceil(data.totalData / ITEMS_PER_PAGE), 25));
      if (koreanGenres.find((genre) => genre.id == categoryId)) setGenreData(koreanGenres);
      else if (foreignGenres.find((genre) => genre.id == categoryId)) setGenreData(foreignGenres);
      else setGenreData(ebookGenres);
    }
  }, [data, koreanGenres, foreignGenres, ebookGenres, totalPages, categoryId]);

  useEffect(() => {
    if (categoryId && koreanGenres && foreignGenres && ebookGenres) {
      const selectedGenre: Genre | undefined =
        koreanGenres.find((genre) => genre.id == categoryId) ||
        foreignGenres.find((genre) => genre.id == categoryId) ||
        ebookGenres.find((genre) => genre.id == categoryId);

      if (selectedGenre) setSelectedTab(selectedGenre.id.toString());
    }
  }, [categoryId, koreanGenres, foreignGenres, ebookGenres]);

  useEffect(() => {
    if (selectedTab) refetch();
  }, [selectedTab, refetch]);

  const handleTabClick = (id: number) => {
    window.history.pushState(null, '', `/category/${id}`);
    setSelectedTab(id.toString());
  };

  return (
    <section className="max-w-7xl m-auto mt-6 flex">
      <nav
        role="tablist"
        className="border border-2 rounded-lg w-[200px] min-h-[400px] h-fit px-3 py-5 mr-7 flex flex-col items-center gap-4"
      >
        {genreData && (
          <p className="font-bold border-b pb-3 mb-1 w-[150px] text-center">
            {genreData === koreanGenres
              ? '국내도서'
              : genreData === foreignGenres
              ? '외국도서'
              : genreData === ebookGenres
              ? 'eBook'
              : ''}
          </p>
        )}
        {genreData?.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            onClick={() => handleTabClick(tab.id)}
            className={clsx('block hover:font-bold', tab.id == Number(selectedTab) && 'font-bold')}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="w-[1080px]">
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4" style={{ rowGap: '30px' }}>
          {isPending
            ? Array.from({ length: 40 }).map((_, index) => <SkeletonItem key={index} />)
            : data?.item.map((item) => (
                <Link key={item.isbn13} href={`http://localhost:3000/${item.isbn13}`}>
                  <CategoryItem key={item.itemId} item={item} isForeign={genreData === foreignGenres} />
                </Link>
              ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination isCompact showControls total={totalPages} page={page} onChange={(page) => setPage(page)} />
        </div>
      </div>
    </section>
  );
}

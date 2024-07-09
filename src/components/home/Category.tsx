'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Pagination
} from '@nextui-org/react';
import CategoryItem from './CategoryItem';

export default function Category() {
  const genres = [
    {
      key: 'home',
      label: '가정/요리/뷰티'
    },
    {
      key: 'health',
      label: '건강/취미/레저'
    },
    {
      key: 'business',
      label: '경제경영'
    },
    {
      key: 'classic',
      label: '고전'
    },
    {
      key: 'comic',
      label: '만화'
    },
    {
      key: 'socialScience',
      label: '사회과학'
    },
    {
      key: 'novel',
      label: '소설/시/희곡'
    }
  ];
  return (
    <section className="max-w-7xl m-auto">
      <Navbar maxWidth="full" position="static">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem isActive>
            <Dropdown>
              <DropdownTrigger>
                <Link>전체</Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={genres}>
                {(genre) => <DropdownItem key={genre.key}>{genre.label}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Link>베스트셀러</Link>
          </NavbarItem>
          <NavbarItem>
            <Link>새로 나온 책</Link>
          </NavbarItem>
          <NavbarItem>
            <Link>베스트 예감</Link>
          </NavbarItem>
          <NavbarItem>
            <Link>화제의 책</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="border border-gray-300 rounded-md p-1 text-xs w-56"
          />
        </NavbarContent>
      </Navbar>
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryItem key={index} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination isCompact showControls total={68} initialPage={1} />
      </div>
    </section>
  );
}

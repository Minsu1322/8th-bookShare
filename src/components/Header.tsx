import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Navbar maxWidth="full" className="bg-main">
        <NavbarContent className="hidden sm:flex gap-6 text-white font-bold" justify="start">
          <NavbarItem>
            <Link href="#">국내도서</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">외국도서</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">eBook</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">책In Only</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">커뮤니티</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarBrand>
            <Link href="/">
              <svg width="50" height="50" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 16C35.1826 16 38.2348 17.2643 40.4853 19.5147C42.7357 21.7652 44 24.8174 44 28V42H36V28C36 26.9391 35.5786 25.9217 34.8284 25.1716C34.0783 24.4214 33.0609 24 32 24C30.9391 24 29.9217 24.4214 29.1716 25.1716C28.4214 25.9217 28 26.9391 28 28V42H20V28C20 24.8174 21.2643 21.7652 23.5147 19.5147C25.7652 17.2643 28.8174 16 32 16Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18H4V42H12V18Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button className="bg-white text-black">Sign In</Button>
          </NavbarItem>
          <NavbarItem>
            <Button className="bg-black text-white">Register</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
}

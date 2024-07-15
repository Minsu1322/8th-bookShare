'use client';

import { useEffect, useState } from 'react';
import '../styles/TopButton.css';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 90) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className={`scroll-to-top ${isVisible && 'show'}`} onClick={scrollToTop}>
      ↑
    </button>
  );
}

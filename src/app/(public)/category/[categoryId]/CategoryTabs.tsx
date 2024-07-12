'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export const Tabs: React.FC<{ tabs: Tab[]; className?: string }> = ({ tabs, className }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section className={clsx('flex flex-col', className)}>
      <div
        className="flex items-center justify-between tablet:block"
        role="tablist"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            tabRefs.current[focusedIdx]?.setAttribute('tabIndex', '-1');
            if (event.key === 'ArrowRight')
              setFocusedIdx((curr) => {
                const next = (curr + 1) % tabs.length;
                tabRefs.current[next]?.focus();
                return next;
              });
            else if (event.key === 'ArrowLeft')
              setFocusedIdx((curr) => {
                const prev = (curr - 1 + tabs.length) % tabs.length;
                tabRefs.current[prev]?.focus();
                return prev;
              });
          }
        }}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[idx] = el)}
            role="tab"
            aria-selected={idx === selectedIdx}
            tabIndex={idx === focusedIdx ? 0 : -1}
            onClick={() => setSelectedIdx(idx)}
            className={clsx(
              'flex-1 rounded-t-min px-4 py-2 text-left font-bold tablet:flex-none tablet:py-3',
              idx === selectedIdx ? 'bg-section' : 'text-secondary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/*<div className="flex-1 rounded-t-min px-4 py-2 text-left font-bold tablet:flex-none tablet:py-3"></div>*/}
      {tabs.map((tab, idx) => (
        <div
          key={tab.id}
          role="tabpanel"
          tabIndex={0}
          hidden={idx !== selectedIdx}
          className={clsx('flex-1 rounded-min bg-section', {
            'rounded-tl-[0]': selectedIdx === 0
          })}
        >
          {tab.content}
        </div>
      ))}
    </section>
  );
};

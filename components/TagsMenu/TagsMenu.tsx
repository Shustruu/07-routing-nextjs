'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={menuRef}>
      <button
        className={css.toggleButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        Filter by tag ⌄
      </button>

      {isOpen && (
        <ul className={css.dropdown}>
          {tags.map((tag) => {
            const href = `/notes/filter/${tag}`;
            return (
              <li key={tag}>
                <Link href={href} className={css.tagButton}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


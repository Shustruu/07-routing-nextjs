'use client';

import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation" className={css.nav}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <TagsMenu />
      </nav>
    </header>
  );
};

export default Header;



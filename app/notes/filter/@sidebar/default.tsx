import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarDefault() {
  return (
    <nav className={css.sidebar}>
      <ul className={css.list}>
        {tags.map(tag => {
          const path = tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`;
          return (
            <li key={tag}>
              <Link href={path} className={css.link}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


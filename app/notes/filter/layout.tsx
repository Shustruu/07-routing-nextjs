import type { ReactNode } from 'react';

interface FilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({
  children,
  sidebar,
}: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <aside>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}



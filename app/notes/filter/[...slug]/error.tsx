'use client';

import { useEffect } from 'react';

export default function FilterError() {
  useEffect(() => {
    console.error('An error occurred while loading filtered notes.');
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>We couldn`t load filtered notes. Please try again later.</p>
    </div>
  );
}

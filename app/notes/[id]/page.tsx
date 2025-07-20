// app/notes/[id]/page.tsx або аналогічний файл у Next.js

import { getSingleNote } from '@/lib/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import NotePreview from '@/components/NotePreview/NotePreview';

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}

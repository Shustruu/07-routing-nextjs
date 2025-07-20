import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getSingleNote } from '@/lib/api';
import NotePreview from './NotePreview.client';

export default async function ModalNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idString } = await params;
  const id = Number(idString);

  if (!id || isNaN(id)) return notFound();

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









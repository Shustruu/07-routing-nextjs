import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filtered Notes',
};

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0];
  const safeTag = tag !== 'All' ? tag : '';

  const data = await fetchNotes('', 1, safeTag);

  return <NotesClient initialData={data} tag={tag} />;
}




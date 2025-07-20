'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface Props {
  id: number;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return null;
  if (isError || !note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
      <p>Created: {note.createdAt}</p>
    </Modal>
  );
}




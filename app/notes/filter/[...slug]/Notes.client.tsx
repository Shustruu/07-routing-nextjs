'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface Props {
  initialData: FetchNotesResponse;
  tag?: string;
}

export default function NotesClient({ tag = '', initialData }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const safeTag = tag !== 'All' ? tag : '';

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

const { data } = useQuery<FetchNotesResponse>({
  queryKey: ['notes', debouncedSearch, safeTag, page],
  queryFn: () => fetchNotes(debouncedSearch, page, safeTag),
  initialData,
  placeholderData: (prev) => prev ?? initialData,
  staleTime: 1000 * 60 * 5,
});


  return (
    <>
      <SearchBox
        value={search}
        onChange={(value) => {
          setSearch(value);
          debounced(value);
        }}
      />

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      <Pagination
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
        onPageChange={setPage}
      />

      <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

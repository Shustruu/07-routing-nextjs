'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

interface Props {
  tag?: string;
  initialData: {
    notes: Note[];
    totalPages: number;
  };
}

export default function NotesClient({ initialData, tag = '' }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: (prev) => prev ?? initialData,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <Toaster />
      <header>
        <SearchBox value={search} onChange={handleSearch} />
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <Loader />}
      {isError && error && <ErrorMessage>{error.message}</ErrorMessage>}

      {data && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
        <NotePreview id={0} /> {}
      </Modal>
      
      )}
    </div>
  );
}

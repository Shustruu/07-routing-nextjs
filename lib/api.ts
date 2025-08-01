import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NewNoteData } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number | undefined> = {
    search: search.trim() || undefined,
    page,
    perPage: 12,
    tag: tag || undefined,
  };

  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/notes', {
    params,
  });

  return response.data;
};

export const getNotes = fetchNotes;

export const getSingleNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: NewNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('/notes', newNote);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};

export const getTags = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await axiosInstance.get('/tags');
  return response.data;
};

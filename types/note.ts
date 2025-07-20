export interface Note {
  id: number;
  text: string;
  title: string;
  content: string;
  createdAt: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

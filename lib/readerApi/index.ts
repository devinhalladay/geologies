import { ReaderResponse } from './../../pages/api/reader';
import { Book } from './../readwise/types';

export const fetchArticle = async (book: Book): Promise<ReaderResponse> => {
  const reader = await fetch(`/api/reader?url=${book.source_url}`);
  const markup = await reader.json();
  return markup;
};

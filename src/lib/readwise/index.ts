import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalstorage } from 'rooks';
import useSWR from 'swr';
import { Book, Highlight, RawBook, RawHighlight } from './types';

interface FetchBookmarksRequest {
  name?: string;
  state?: string;
  count?: number;
  id?: number | string;
  token?: string;
}

interface FetchBookmarksResponse {
  list: Record<string, RawHighlight>;
}

interface FetchBooksRequest {
  name?: string;
  state?: string;
  count?: number;
  token?: string;
}

interface FetchBooksResponse {
  list: Record<string, RawBook>;
}

const BASE_URL = 'https://readwise.io/api/';

export const request = async (
  url,
  method: 'POST' | 'GET',
  token: string,
  options?: object
) => {
  return fetch(BASE_URL + url, {
    method: method,
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    ...options,
  });
};

export const auth = async (token: string) =>
  await fetch('https://readwise.io/api/v2/auth', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
  });

export const fetchHighlights = async ({
  name,
  state,
  count,
  id,
  token,
}: FetchBookmarksRequest = {}): Promise<Array<Highlight>> => {
  const response = await fetch(
    BASE_URL + `v2/highlights?page_size=1000&book_id=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'content-type': 'application/json',
      },
    }
  );

  const result = await response.json();
  const results = result.results as FetchBookmarksResponse;

  const bookmarks: Array<Highlight> = Object.values(results).map((item) => ({
    id: item.id,
    text: item.text,
    note: item.note,
    location: item.location,
    location_type: item.location_type,
    highlighted_at: item.hightlighted_at,
    url: item.url,
    color: item.color,
    updated: item.updated,
    book_id: item.book_id,
    tags: item.tags,
  }));

  return bookmarks;
};

export function useHighlights() {
  const { value: token } = useLocalstorage('g:readwise_token');

  const { id } = useParams();

  const { data, error, isValidating } = useSWR<Array<Highlight>, any>(
    'v2/highlights',
    () => fetchHighlights({ id, token: token as string })
  );

  useEffect(() => {
    if (error) {
      if (
        error.response.statusCode === 401 ||
        error.response.statusCode === 403
      ) {
        console.log('Invalid Credentials');
      } else {
        throw error;
      }
    }
  }, [error]);

  return {
    bookmarks: data || [],
    loading: (!data && !error) || isValidating,
  };
}

export async function fetchBooks({
  name,
  state,
  count,
  token,
}: FetchBooksRequest = {}): Promise<Array<Book>> {
  const response = await request(
    'v2/books?category=articles&page_size=500',
    'GET',
    token
  );

  const result = await response.json();

  const results = result.results as FetchBooksResponse;

  const books: Array<Book> = Object.values(results).map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    category: item.category,
    source: item.source,
    num_highlights: item.num_highlights,
    last_highlight_at: item.last_highlighted_at,
    updated: item.updated,
    cover_image_url: item.cover_image_url,
    highlights_url: item.highlights_url,
    source_url: item.source_url,
    asin: item.asin,
    tags: item.tags,
  }));

  return books.sort((a, b) => b.num_highlights - a.num_highlights);
}

export function useBooks() {
  const { value: token } = useLocalstorage('g:readwise_token');

  const { data, error, isValidating } = useSWR<Array<Book>, any>(
    'v2/books',
    () => fetchBooks({ token: token as string })
  );

  useEffect(() => {
    if (error) {
      if (
        error.response.statusCode === 401 ||
        error.response.statusCode === 403
      ) {
        console.error('Invalid Credentials');
      } else {
        throw error;
      }
    }
  }, [error]);

  return {
    books: data || [],
    loading: (!data && !error) || isValidating,
  };
}

export const CmsClient: {
  fetchHighlights(): Promise<Array<Highlight>>;
} = {
  fetchHighlights,
};

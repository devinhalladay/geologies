import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalstorage } from 'rooks';
import useSWR, { mutate } from 'swr';

import {
  READWISE_API_BASE_URL,
  READWISE_TOKEN_LOCALSTORAGE_KEY,
} from '../../constants/values';
import {
  Book,
  FetchBookmarksRequest,
  FetchBookmarksResponse,
  FetchBooksRequest,
  FetchBooksResponse,
  Highlight,
} from './types';

/**
 * Fetches data from the Readwie API.
 * @param url The Readwise API endpoint to hit. Omit the leading slash.
 * @param method The method to use for the request.
 * @param token The Readwise user access token to use for the request.
 * @param options Additional options to pass to the request.
 * @returns The response body as a JSON object.
 */
const request = async <T>(
  url: string,
  method: 'POST' | 'GET' | 'DELETE',
  token: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(READWISE_API_BASE_URL + url, {
    method: method,
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const json = await response.json();

  return json;
};

/**
 * Verify the that saved Readwise token is valid.
 * @param token The user's Readwise access token.
 * @returns unknown
 */
// TODO: Figure out what the response is and type the return value accoringly.
export const verifyAuth = async (token: string) =>
  await request<any>('v2/auth', 'GET', token);

/**
 * Fetch all highlights from a given book.
 * @param args.id The book ID to fetch highlights from.
 * @param args.token The user's Readwise access token.
 * @returns `Highlight[]` – The user's highlights.
 */
export const fetchHighlights = async ({
  id,
  token,
}: FetchBookmarksRequest): Promise<Highlight[]> => {
  const result = await request<any>(
    `v2/highlights?page_size=1000&book_id=${id}`,
    'GET',
    token
  );
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

/**
 * React hook to fetch the user's Readwise bookmarks.
 * @returns An object with the data and loading state.
 */
export function useHighlights() {
  const { value: token }: { value: string } = useLocalstorage(
    READWISE_TOKEN_LOCALSTORAGE_KEY
  );

  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isValidating } = useSWR<Array<Highlight>, any>(
    id ? 'v2/highlights' : null,
    () => fetchHighlights({ id, token }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    mutate('v2/highlights', data);
  }, [token]);

  useEffect(() => {
    if (error) {
      if (error.status === 401 || error.status === 403) {
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
  token,
}: FetchBooksRequest): Promise<Array<Book>> {
  const { results } = await request<FetchBooksResponse>(
    'v2/books?category=articles&page_size=500',
    'GET',
    token
  );

  const books: Array<Book> = Object.values(results).map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    category: item.category,
    source: item.source,
    num_highlights: item.num_highlights,
    last_highlight_at: item.last_highlight_at,
    updated: item.updated,
    cover_image_url: item.cover_image_url,
    highlights_url: item.highlights_url,
    source_url: item.source_url,
    asin: item.asin,
    tags: item.tags,
  }));

  return books.sort((a, b) => b.num_highlights - a.num_highlights);
}

export function useBooks(token: string) {
  const { data, error, isValidating } = useSWR(
    'v2/books',
    () => fetchBooks({ token: token }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error) {
      if (error.status === 401 || error.status === 403) {
        console.error('Invalid Credentials');
      } else {
        throw error;
      }
    }
  }, [error]);

  return {
    books: data || [],
    loading: (!data && !error) || isValidating,
    error: error,
  };
}

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Highlight, RawHighlight, Book, RawBook } from './types';

interface FetchBookmarksRequest {
  name?: string;
  state?: string;
  count?: number;
  id?: number | string;
}

interface FetchBookmarksResponse {
  list: Record<string, RawHighlight>;
}

interface FetchBooksRequest {
  name?: string;
  state?: string;
  count?: number;
}

interface FetchBookRequest {
  id?: string | number;
}

interface FetchBooksResponse {
  list: Record<string, RawBook>;
}

const BASE_URL = 'https://readwise.io/api/';

export const request = async (
  url,
  method: 'POST' | 'GET',
  options?: object
) => {
  return fetch(BASE_URL + url, {
    method: method,
    headers: {
      Authorization: `Token ${process.env.REACT_APP_READWISE_TOKEN}`,
      'content-type': 'application/json',
    },
    ...options,
  });
};

export const fetchHighlights = async ({
  name,
  state,
  count,
  id,
}: FetchBookmarksRequest = {}): Promise<Array<Highlight>> => {
  // const response = await request('v2/highlights?page_size=1000', 'GET', {
  //   headers: {
  //     Authorization: `Token ${process.env.READWISE_TOKEN}`,
  //     'content-type': 'application/json',
  //   },
  // });

  const response = await fetch(
    BASE_URL + `v2/highlights?page_size=1000&book_id=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.REACT_APP_READWISE_TOKEN}`,
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
  const { id } = useParams();

  const { data, error, isValidating } = useSWR<Array<Highlight>, any>(
    'v2/highlights',
    () => fetchHighlights({ id })
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

export const auth = async () =>
  await fetch('https://readwise.io/api/v2/auth', {
    method: 'GET',
    headers: {
      Authorization: `Token ${process.env.REACT_APP_READWISE_TOKEN}`,
      'content-type': 'application/json',
    },
  });

export async function fetchBooks({
  name,
  state,
  count,
}: FetchBooksRequest = {}): Promise<Array<Book>> {
  const response = await request(
    'v2/books?category=articles&page_size=500',
    'GET'
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

export async function fetchBook({ id }: FetchBookRequest = {}): Promise<
  Array<Book>
> {
  const response = await request('v2/highlights', 'GET', {
    body: {
      book_id: id,
    },
  });

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
  const { data, error, isValidating } = useSWR<Array<Book>, any>(
    'v2/books',
    fetchBooks
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

export function useBook() {
  const { data, error, isValidating } = useSWR<Array<Book>, any>(
    'v2/highlights',
    fetchBooks
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
    book: data || [],
    loading: (!data && !error) || isValidating,
  };
}

export const CmsClient: {
  fetchHighlights(): Promise<Array<Highlight>>;
} = {
  fetchHighlights,
};

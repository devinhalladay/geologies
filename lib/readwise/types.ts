/**
 * The following are type definitions for Readwise.
 *
 * [API Documentation](https://readwise.io/api_deets)
 */

// A const for a type definition extending RawBook. Omit the `text` field.
// export interface Book extends Omit<RawBook, 'text'> {

type GenericId = string | number;

/**
 * A tag can be applied to highlights and books.
 */
export interface Tag {
  id: GenericId;
  name: string;
}

/**
 * Stub for a highlight. Detailed highlights should use the `Highlight` type.
 */
export interface RawHighlight {
  id: GenericId;
  text: string;
}

/**
 * Detailed highlight object. Extends `RawHighlight`.
 */
export interface Highlight extends RawHighlight {
  note: string;
  location: string;
  location_type: string;
  highlighted_at: string;
  url: string;
  color: string;
  updated: string;
  book_id: GenericId;
  tags: Tag[];
}

/**
 * Stub for a book. Detailed books should use the `Book` type.
 */
export interface RawBook {
  id: GenericId;
  text: string;
}

/**
 * Detailed book object. Extends `RawBook`.
 *
 * *This type is consumed by various "source types", which are not always webpages.*
 */

export interface Book extends Omit<RawBook, 'text'> {
  id: GenericId;
  title: string;
  author: string;
  category: string;
  source: string;
  num_highlights: number;
  last_highlight_at: string;
  updated: string;
  cover_image_url: string;
  highlights_url: string;
  source_url: string;
  asin: string;
  tags: Tag[];
}

/**
 * `GET` request body for the Readwise Highlights API.
 */
export interface FetchBookmarksRequest {
  id: GenericId;
  token: string;
}

/**
 * `GET` response body for the Readwise Highlights API.
 */
export interface FetchBookmarksResponse {
  list: Record<string, RawHighlight>;
}

/**
 * `GET` request body for the Readwise Books API.
 */
export interface FetchBooksRequest {
  token: string;
}

/**
 * `GET` response body for the Readwise Books API.
 */
export interface FetchBooksResponse {
  count: number;
  next: any;
  previous: any;
  results: Book[];
}

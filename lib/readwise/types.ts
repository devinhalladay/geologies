export interface Highlight {
  id: number;
  text: string;
  note: string;
  location: string;
  location_type: string;
  highlighted_at: string;
  url: string;
  color: string;
  updated: string;
  book_id: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Book {
  id: number;
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

export interface RawHighlight {
  id: string;
  text: string;
}

export interface RawBook {
  id: string;
  text: string;
}

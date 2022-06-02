import whitespace from 'dom-whitespace';
import { Readability } from '@mozilla/readability';
import { NextApiRequest, NextApiResponse } from 'next';
import { JSDOM } from 'jsdom';
import htmlclean from 'htmlclean';

type Data<T> = {
  /** article title */
  title: string;
  /** author metadata */
  byline: string;
  /** content direction */
  dir: string;
  /** HTML of processed article content */
  content: T;
  /** text content of the article (all HTML removed) */
  textContent: string;
  /** length of an article, in characters */
  length: number;
  /** article description, or short excerpt from the content */
  excerpt: string;
  siteName: string;
};

export default async (
  request: NextApiRequest,
  response: NextApiResponse<string>
) => {
  /**
   * Fetch the article HTML as text from source URL
   */
  const url = request.query.url as string;
  const article = await fetch(url);
  const markup = await article.text();

  /**
   * Create a JSDOM object, which provides a virtual DOM interface to the HTML.
   * The document object will be accessible via `doc.window.document`.
   */
  const doc = new JSDOM(markup);

  /**
   * Create a Readability object, which will parse the HTML and extract the
   * most likely article content.
   * `reader.content` will return stringified HTML, which can be used to
   * render the article content as markup.
   * `reader.textContent` will return the text itself, with all HTML stripped.
   */
  const reader = new Readability(doc.window.document).parse();

  /**
   * Convert the Readability HTML back to a JSDOM object for manipulation.
   */
  const readerDoc = new JSDOM(reader.content);

  /**
   * Passing the document fragment which contains our article content,
   * clean it in order to strip errant whitespace, such as newlines,
   * hard-coded indents and spaces, and space between HTML tags.
   */
  const minifiedMarkup: string = htmlclean(
    readerDoc.window.document.body.innerHTML
  );

  response.status(200).send(minifiedMarkup);
};

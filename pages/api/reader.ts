import { Readability } from '@mozilla/readability';
import { NextApiRequest, NextApiResponse } from 'next';
import { JSDOM } from 'jsdom';

type Data = {
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
  response: NextApiResponse<Data>
) => {
  const url = request.query.url as string;
  const article = await fetch(url);
  const markup = await article.text();

  const doc = new JSDOM(markup, {
    url: url,
    includeNodeLocations: true,
    storageQuota: 10000000,
  });

  const reader = new Readability(doc.window.document).parse();

  response.status(200).send(reader);
};

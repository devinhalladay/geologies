import htmlclean from 'htmlclean';
import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';

import { Readability } from '@mozilla/readability';

const Node = new JSDOM('').window.Node;

export type ReaderResponse = {
  markup: string;
  text: string;
  source: string;
};

export default async (
  request: NextApiRequest,
  response: NextApiResponse<ReaderResponse>
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

  readerDoc.window.document.body
    .querySelectorAll('#container > *:not(.highlight)')
    .forEach((p) => {
      // console.log(p);

      p.classList.add('relative');

      // console.log(p.nodeType === Node.TEXT_NODE);

      /**
       * If the child is a `TEXT_NODE` (`3`), wrap it in a `<p />`.
       * [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
       */
      // if (p.nodeType === 3) {
      //   p.innerHTML = `<p>${p}</p>`;
      // }

      // Array.from(p.children).forEach((child) => {
      //   console.log(child.nodeType);

      // });
    });

  // Array.from(
  //   readerDoc.window.document.body.querySelector('#container').children
  // ).forEach((child) => {
  //   console.log(child.nodeType);
  // });

  /**
   * Passing the document fragment which contains our article content,
   * clean it in order to strip errant whitespace, such as newlines,
   * hard-coded indents and spaces, and space between HTML tags.
   */
  const minifiedMarkup: string = htmlclean(
    readerDoc.window.document.body.innerHTML
  );

  response.status(200).send({
    markup: minifiedMarkup,
    text: reader.textContent,
    source: reader.content,
  });
};

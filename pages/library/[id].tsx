import { useAnimation } from 'framer-motion';
import { useState } from 'react';

import { useGesture } from '@use-gesture/react';

import Page from '../../components/Page';
import { useBooks, useHighlights } from '../../lib/readwise';
import { usePreventGestureDefault } from '../../utils';
import { useLocalstorage } from 'rooks';
import { BookLink } from '../../components/BookLink';

function Article() {
  const { value: token } = useLocalstorage('g:readwise_token');
  const { bookmarks, loading } = useHighlights();
  const { books, loading: loadingBooks, error } = useBooks(token);

  const book = books.find(({ id }) => id === bookmarks[0].book_id);

  const [pan, setPan] = useState(false);
  const controls = useAnimation();

  usePreventGestureDefault();

  const bind = useGesture(
    {
      onPinchStart: ({ event }) => {
        event.preventDefault();
        setPan(true);
      },
      onPinch: ({ movement: [ms], memo }) => {
        controls.start((i) => ({
          height: ms < 1 ? 80 : 400,
        }));

        return memo;
      },
      onPinchEnd: ({ event }) => {
        event.preventDefault();
        setPan(false);
      },
    },
    {
      eventOptions: {
        passive: false,
      },
    }
  );

  return loading || loadingBooks ? (
    <div>Loading…</div>
  ) : (
    <div>
      <div className={`flex gap-4 mb-8`}>
        <div className="flex flex-col space-2 grow">
          <h1 className="text-xl font-sans">{book.title}</h1>
          <small className="text-moss/70">
            <span className="capitalize">{book.source}</span> • {book.author}
          </small>
          <a
            href={book.highlights_url}
            className="mt-2 bg-moss/10 text-moss border rounded-md text-xs font-sans w-fit px-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Readwise
          </a>
        </div>
        <div className="w-14 h-14 shrink-0">
          <img
            src={book.cover_image_url}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {bookmarks.map((bookmark, i) => (
        <Page
          key={bookmark.id}
          pageIndex={i}
          pages={bookmarks}
          bind={bind}
          animate={controls}
          custom={i}
          pan={pan}
          text={bookmark.text}
        />
      ))}
    </div>
  );
}

export default Article;

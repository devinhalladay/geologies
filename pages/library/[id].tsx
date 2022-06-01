import { useAnimation } from 'framer-motion';
import { useState } from 'react';
import { useLocalstorage } from 'rooks';

import { useGesture } from '@use-gesture/react';

import Page from '../../components/Page';
import { useBooks, useHighlights } from '../../lib/readwise';
import { usePreventGestureDefault } from '../../utils';
import language from '../../constants/language';
import { READWISE_TOKEN_LOCALSTORAGE_KEY } from '../../constants/values';

function Article() {
  const { value: token } = useLocalstorage(READWISE_TOKEN_LOCALSTORAGE_KEY);
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
            {language.article.metadata(book)}
          </small>
          <a
            href={book.highlights_url}
            className="mt-2 bg-moss/10 text-moss border rounded-md text-xs font-sans w-fit px-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {language.article.readwiseLink}
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
          token={token}
          bookmark={bookmark}
          key={bookmark.id}
          pageIndex={i}
          bind={bind}
          animate={controls}
          custom={i}
          pan={pan}
        />
      ))}
    </div>
  );
}

export default Article;

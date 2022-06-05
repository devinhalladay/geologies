import { motion, useAnimation } from 'framer-motion';
import { Interweave } from 'interweave';
import { useEffect, useRef, useState } from 'react';
import { useLocalstorage } from 'rooks';

import { useGesture } from '@use-gesture/react';

import language from '../../constants/language';
import { READWISE_TOKEN_LOCALSTORAGE_KEY } from '../../constants/values';
import useMatcher from '../../hooks/useMatcher';
import usePanGesture from '../../hooks/usePanGesture';
import { fetchArticle } from '../../lib/readerApi';
import { useBooks, useHighlights } from '../../lib/readwise';
import { usePreventGestureDefault } from '../../utils';

function Article() {
  // Pulling in data for the article
  const { value: token } = useLocalstorage(READWISE_TOKEN_LOCALSTORAGE_KEY);
  const { bookmarks, loading } = useHighlights();
  const { books, loading: loadingBooks, error } = useBooks(token);
  const book = books.find(({ id }) => id === bookmarks[0].book_id);

  // Storing state and refs for interactions
  const [pan, setPan] = useState(false);
  const controls = useAnimation();
  const [article, setArticle] = useState<string>(null);
  const highlightRefs = useRef<HTMLSpanElement[]>([]);
  const pageRef = useRef<HTMLDivElement>();

  // Once our metadata is fetched from Readwise, fetch the source page
  // via the Geologies reader API, then add it to state.
  useEffect(() => {
    if (book) {
      fetchArticle(book).then((reader) => {
        setArticle(reader.markup);
      });
    }
  }, [book]);

  // Removes any empty positions from the array.
  useEffect(() => {
    // TODO: Figure out why empty positions are being added in the first place.
    highlightRefs.current = highlightRefs.current.filter((e) => e);
  }, [highlightRefs.current]);

  // Create Interweave matchers for every highlight.
  // TODO: Find ways to enhance performance, this is very expensive.
  const matcher = useMatcher(highlightRefs);
  const matchers = bookmarks.map((bookmark, i) => {
    return matcher(bookmark);
  });

  // Setup Framer animations.
  usePreventGestureDefault();
  usePanGesture(pan, highlightRefs);

  // Setup pinch gesture. Attach to an element by spreading `{...bind()`} onto it.
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

  return loading || loadingBooks || !article ? (
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
            alt={language.article.coverImage.alt(book.title)}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div {...bind()}>
        <motion.div ref={pageRef} animate={controls}>
          <Interweave content={article} matchers={matchers} />;
        </motion.div>
      </div>
    </div>
  );
}

export default Article;

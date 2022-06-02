import { useAnimation } from 'framer-motion';
import { useState } from 'react';
import { useLocalstorage } from 'rooks';

import { useGesture } from '@use-gesture/react';

import { useEffect } from 'react';
import Page from '../../components/Page';
import language from '../../constants/language';
import { READWISE_TOKEN_LOCALSTORAGE_KEY } from '../../constants/values';
import { useBooks, useHighlights } from '../../lib/readwise';
import { Book, Highlight } from '../../lib/readwise/types';
import { usePreventGestureDefault } from '../../utils';
import { Interweave, MatcherInterface, MatchResponse } from 'interweave';
import { ReaderResponse } from '../api/reader';
import { useRef } from 'react';

const fetchArticle = async (book: Book): Promise<ReaderResponse> => {
  const reader = await fetch(`/api/reader?url=${book.source_url}`);
  const markup = await reader.json();
  console.log(markup);

  return markup;
};

function Article() {
  const { value: token } = useLocalstorage(READWISE_TOKEN_LOCALSTORAGE_KEY);
  const { bookmarks, loading } = useHighlights();
  const { books, loading: loadingBooks, error } = useBooks(token);
  const highlightRefs = useRef<HTMLSpanElement[]>([]);

  const matcher = (bookmark: Highlight): MatcherInterface => {
    return {
      inverseName: 'noFoo',
      propName: 'foo',
      match(string): MatchResponse<any> {
        // if (
        //   bookmark.text.includes('This captures something') &&
        //   string.includes('This captures something')
        // ) {
        //   console.log({
        //     string: string,
        //     highlight: bookmark.text,
        //   });
        // }

        function escapeRegExp(stringToGoIntoTheRegex) {
          return stringToGoIntoTheRegex.replace(
            /[-\/\\^$*+?.()|[\]{}]/g,
            '\\$&'
          );
        }

        const regex = new RegExp(escapeRegExp(bookmark.text));

        console.log(regex);

        const result = string.match(regex);

        if (!result) {
          return null;
        }

        console.log(result);

        return {
          index: result.index!,
          length: result[0].length,
          match: result[0],
          className: 'highlight',
          valid: true,
        };
      },
      createElement(children, props) {
        return (
          <span
            {...props}
            ref={(el) =>
              (highlightRefs.current[highlightRefs.current.length + 1] = el)
            }
          >
            {children}
          </span>
        );
      },
      asTag() {
        return 'span';
      },
    };
  };

  const matchers = bookmarks.map((bookmark, i) => {
    return matcher(bookmark);
  });

  const book = books.find(({ id }) => id === bookmarks[0].book_id);

  const [pan, setPan] = useState(false);
  const controls = useAnimation();

  const [article, setArticle] = useState<string>(null);

  useEffect(() => {
    if (book) {
      fetchArticle(book).then((b) => {
        setArticle(b.markup);
      });
    }
  }, [book]);

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
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <Interweave content={article} matchers={matchers} />;
      {/* {bookmarks.map((bookmark, i) => {
        return i < 5 ? (
          <Page
            token={token}
            bookmark={bookmark}
            key={bookmark.id}
            pageIndex={i}
            bind={bind}
            animate={controls}
            custom={i}
            article={article}
            pan={pan}
          />
        ) : null;
      })} */}
    </div>
  );
}

export default Article;

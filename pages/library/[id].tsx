import { useAnimation } from 'framer-motion';
import { animate as framer, AnimationControls, motion } from 'framer-motion';

import { Interweave, MatcherInterface, MatchResponse } from 'interweave';
import { useEffect, useRef, useState } from 'react';
import { useLocalstorage } from 'rooks';

import { useGesture } from '@use-gesture/react';

import language from '../../constants/language';
import { READWISE_TOKEN_LOCALSTORAGE_KEY } from '../../constants/values';
import { useBooks, useHighlights } from '../../lib/readwise';
import { Book, Highlight } from '../../lib/readwise/types';
import { escapeForRegExp, usePreventGestureDefault } from '../../utils';
import { ReaderResponse } from '../api/reader';
import { forwardRef } from 'react';

const fetchArticle = async (book: Book): Promise<ReaderResponse> => {
  const reader = await fetch(`/api/reader?url=${book.source_url}`);
  const markup = await reader.json();
  return markup;
};

const HighlightSpan = forwardRef<HTMLSpanElement, any>(
  ({ children, ...rest }, ref) => {
    return (
      <span ref={ref} {...rest} className="highlight">
        {children}
      </span>
    );
  }
);

function Article() {
  const { value: token } = useLocalstorage(READWISE_TOKEN_LOCALSTORAGE_KEY);
  const { bookmarks, loading } = useHighlights();
  const { books, loading: loadingBooks, error } = useBooks(token);
  const highlightRefs = useRef<HTMLSpanElement[]>([]);
  const pageRef = useRef<HTMLDivElement>();

  // log highlightRefs to the console when it updates
  useEffect(() => {
    highlightRefs.current = highlightRefs.current.filter((e) => e);
  }, [highlightRefs.current]);

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

  const matcher = (bookmark: Highlight): MatcherInterface => {
    return {
      inverseName: 'noFoo',
      propName: 'foo',
      match(string): MatchResponse<any> {
        const regex = new RegExp(escapeForRegExp(bookmark.text));
        const result = string.match(regex);

        if (!result) {
          return null;
        }

        return {
          index: result.index!,
          length: result[0].length,
          match: result[0],
          className: 'highlight',
          valid: true,
        };
      },
      createElement(children, props) {
        const index = highlightRefs.current.length;

        return (
          <HighlightSpan
            ref={(el) =>
              (highlightRefs.current[parseInt(bookmark.location)] = el)
            }
            key={index}
            {...props}
          >
            {children}
          </HighlightSpan>
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

  useEffect(() => {
    // if (highlightRefs.current.length) {
    //   const newRef = highlightRefs.current.map((ref, i) => {
    //     let topPos = ref.offsetTop + ref.clientHeight;

    //     if (pan) {
    //       framer(document.body.scrollTop, topPos, {
    //         onUpdate: (top) =>
    //           document.body.scrollTo({ top, behavior: 'smooth' }),
    //       });
    //     }

    //     return ref;
    //   });

    //   highlightRefs.current = newRef;
    // }
    if (document.documentElement) {
      if (highlightRefs.current.length) {
        const ref = highlightRefs.current[0];

        let topPos = ref.offsetTop + ref.clientHeight;

        if (pan) {
          framer(document.documentElement.scrollTop, topPos, {
            onUpdate: (top) => {
              console.log('test');

              document.documentElement.scrollTo({
                top,
                behavior: 'smooth',
              });
            },
          });
        }
      }
    }
  }, [pan]);

  useEffect(() => {
    if (highlightRefs.current.length) {
      console.log(highlightRefs.current);

      let topPos =
        highlightRefs.current[0].offsetTop +
        highlightRefs.current[0].clientHeight;
      if (pan) {
        framer(document.body.scrollTop, topPos, {
          onUpdate: (top) =>
            document.body.scrollTo({ top, behavior: 'smooth' }),
        });
      }
    }
  }, [pan, highlightRefs]);

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

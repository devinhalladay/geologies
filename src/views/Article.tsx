import React from 'react';
import { useParams } from 'react-router-dom';
import { useBook, useHighlights } from '../lib/readwise';

import { SpringRef, SpringValue } from '@react-spring/web';
import {
  createRef,
  FC,
  MutableRefObject,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useGesture, usePinch } from '@use-gesture/react';
import Page from '../components/Page';
import { animate, useAnimation } from 'framer-motion';
import { usePreventGestureDefault } from '../utils';

function Article(props) {
  const { id } = useParams();

  const { bookmarks, loading } = useHighlights();

  const [pan, setPan] = useState(false);
  const controls = useAnimation();

  usePreventGestureDefault();

  const bind = useGesture(
    {
      onPinchStart: ({ event }) => {
        event.preventDefault();
        setPan(true);
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
        event,
        args,
      }) => {
        const id = args[0];
        // const { height, y } = pagesRef.current[id].getBoundingClientRect();

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

  return loading ? (
    <div>Loading…</div>
  ) : (
    <div>
      {bookmarks.map((bookmark, i) => (
        <Page
          key={bookmark.id}
          // pagesRef={pagesRef}
          pageIndex={i}
          pages={bookmarks}
          bind={bind}
          // ref={pagesRef.current[i]}
          animate={controls}
          custom={i}
          pan={pan}
          text={bookmark.text}
        />
        // <div className="" key={bookmark.id}>
        //   <p>{bookmark.text}</p>
        //   <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
        //     Go to highlight
        //   </a>
        // </div>
      ))}
    </div>
  );
}

export default Article;

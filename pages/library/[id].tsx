import { useAnimation } from 'framer-motion';
import { useState } from 'react';

import { useGesture } from '@use-gesture/react';

import Page from '../../components/Page';
import { useHighlights } from '../../lib/readwise';
import { usePreventGestureDefault } from '../../utils';

function Article() {
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

  return loading ? (
    <div>Loading…</div>
  ) : (
    <div>
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

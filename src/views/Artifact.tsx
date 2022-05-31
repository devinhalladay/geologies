import { FC, useState } from 'react';

import { useGesture } from '@use-gesture/react';
import { useAnimation } from 'framer-motion';
import Page from '../components/Page';
import { usePreventGestureDefault } from '../utils';

interface Props {
  pages?: any[];
}

const Artifact: FC<Props> = ({ pages = new Array(100).fill(null) }) => {
  // const pagesRef = useRef([]);
  // pagesRef.current = pages.map((_, i) => pagesRef.current[i] ?? createRef());

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

  return (
    <div>
      {pages.map((_, i) => (
        <Page
          key={i}
          // pagesRef={pagesRef}
          pageIndex={i}
          pages={pages}
          bind={bind}
          // ref={pagesRef.current[i]}
          animate={controls}
          custom={i}
          pan={pan}
        />
      ))}
    </div>
  );
};

export default Artifact;

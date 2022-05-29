import { SpringRef, SpringValue } from '@react-spring/web';
import { FC, useEffect, useRef, useState } from 'react';

import { usePinch } from '@use-gesture/react';
import Page from '../components/Page';
import { useAnimation } from 'framer-motion';

interface Props {
  pages?: any[];
}

const Artifact: FC<Props> = ({ pages = new Array(20).fill(null) }) => {
  const pagesRef = useRef<any>([]);

  const controls = useAnimation();

  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, pages.length);
  }, [pages]);

  const bind = usePinch(
    ({
      origin: [ox, oy],
      first,
      movement: [ms],
      offset: [s, a],
      memo,
      event,
      args,
    }) => {
      const id = args[0];

      if (first) {
        const { height, y } = pagesRef.current[id].getBoundingClientRect();
        const ty = oy - (y + height / 2);
        memo = [pagesRef.current[id].style.translateY || 0, ty];
      }

      const y = memo[0] - (ms - 1) * memo[1];

      controls.start((i) => ({
        translateY: y * i * 2,
      }));

      return memo;
    },
    {}
  );

  return (
    <div>
      {pages.map((_, i) => (
        <Page
          key={i}
          pagesRef={pagesRef}
          pageIndex={i}
          pages={pages}
          ref={(el) => (pagesRef.current[i] = el)}
          bind={bind}
          animate={controls}
          custom={i}
        />
      ))}
    </div>
  );
};

export default Artifact;

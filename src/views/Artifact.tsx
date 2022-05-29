import { SpringRef, SpringValue } from '@react-spring/web';
import { FC, useEffect, useRef, useState } from 'react';

import { usePinch } from '@use-gesture/react';
import Page from '../components/Page';

interface Props {
  pages?: any[];
}

const Artifact: FC<Props> = ({ pages = new Array(20).fill(null) }) => {
  const pagesRef = useRef<any>([]);

  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, pages.length);
  }, [pages]);

  const handlePinch = ({
    origin: [ox, oy],
    first,
    movement: [ms],
    offset: [s, a],
    memo,
    event,
    args,
  }) => {
    const id = args[0];
    const [style, api]: [
      {
        translateY: SpringValue<number>;
      },
      SpringRef<{
        translateY: number;
      }>
    ] = args[1];

    if (first) {
      const { height, y } = pagesRef.current[id].getBoundingClientRect();
      const ty = oy - (y + height / 2);
      memo = [style.translateY.get(), ty];
    }

    const y = memo[0] - (ms - 1) * memo[1];

    api.start({ translateY: y * id });

    return memo;
  };

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
      return handlePinch({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
        event,
        args,
      });
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
          pagesRef={pagesRef}
          pageIndex={i}
          pages={pages}
          ref={(el) => (pagesRef.current[i] = el)}
          anim={bind}
        />
      ))}
    </div>
  );
};

export default Artifact;

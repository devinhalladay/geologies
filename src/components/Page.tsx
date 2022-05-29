import React, { Ref, useEffect, useRef, useState } from 'react';
import { useTransition, animated, useSpring } from '@react-spring/web';

import {
  createUseGesture,
  GestureHandlers,
  GestureOptions,
  pinchAction,
  ReactDOMAttributes,
  useDrag,
  useGesture,
  usePinch,
} from '@use-gesture/react';

interface Props {
  pagesRef: any;
  pageIndex: number;
  pages: any[];
  ref: Ref<HTMLDivElement>;
  anim: (...args: any[]) => ReactDOMAttributes;
}

const Page: React.FC<Props> = React.forwardRef(
  ({ pagesRef, pageIndex, pages, anim }, ref) => {
    const [style, api] = useSpring(() => ({
      translateY: 0,
    }));

    return (
      <animated.div
        key={pageIndex}
        ref={ref}
        {...anim(pageIndex, [style, api])}
        style={style}
      >
        <div className="w-full min-h-screen mb-1 bg-white border border-black/10 p-2">
          <span className="font-sans text-gray-400">P {pageIndex}</span>
        </div>
      </animated.div>
    );
  }
);

export default Page;

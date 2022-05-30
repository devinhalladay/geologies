import React, {
  FC,
  MutableRefObject,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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

import {
  animate as framer,
  motion,
  useElementScroll,
  useViewportScroll,
} from 'framer-motion';
import { AnimationControls } from 'framer-motion/types/animation/types';

interface Props {
  // pagesRef: any;
  pageIndex: number;
  pages: any[];
  bind: any;
  animate: AnimationControls;
  custom: any;
  pan: boolean;
}

const Page: FC<Props> = ({ pageIndex, pages, bind, animate, custom, pan }) => {
  // let pageRef = pagesRef.current[pageIndex];
  const pageRef = useRef<HTMLDivElement>();
  const highlightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let topPos =
      highlightRef.current.offsetTop + highlightRef.current.clientHeight - 8;
    console.log(topPos);

    if (pan) {
      framer(pageRef.current.scrollTop, topPos, {
        onUpdate: (top) =>
          pageRef.current.scrollTo({ top, behavior: 'smooth' }),
      });
    }
  }, [pan]);

  return (
    <motion.div
      className="w-full h-[400px] mb-1 bg-white border border-black/10 p-2 shadow-sm overflow-y-scroll"
      key={pageIndex}
      ref={pageRef}
      {...bind(pageIndex)}
      animate={animate}
      custom={custom}
    >
      <span className="font-sans text-gray-400">P {pageIndex + 1}</span>
      <div className="relative h-full w-full text-sm mt-2 gap-2 flex flex-col">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          dolorem illum enim pariatur quam dicta nihil eum saepe ipsum deleniti!
          Ex non totam cum porro repudiandae similique doloribus reiciendis
          error.
        </p>
        <p className="highlight" ref={highlightRef}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          dolorem illum enim pariatur quam dicta nihil eum saepe ipsum deleniti!
          Ex non totam cum porro repudiandae similique doloribus reiciendis
          error.
        </p>
        <p className="highlight">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          dolorem illum enim pariatur quam dicta nihil eum saepe ipsum deleniti!
          Ex non totam cum porro repudiandae similique doloribus reiciendis
          error.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          dolorem illum enim pariatur quam dicta nihil eum saepe ipsum deleniti!
          Ex non totam cum porro repudiandae similique doloribus reiciendis
          error.
        </p>
      </div>
    </motion.div>
  );
};

export default Page;

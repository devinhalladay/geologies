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

import { motion } from 'framer-motion';
import { AnimationControls } from 'framer-motion/types/animation/types';

interface Props {
  pagesRef: any;
  pageIndex: number;
  pages: any[];
  ref: Ref<HTMLDivElement>;
  bind: any;
  animate: AnimationControls;
  custom: any;
}

const Page: React.FC<Props> = React.forwardRef(
  ({ pagesRef, pageIndex, pages, bind, animate, custom }, ref) => {
    return (
      <motion.div
        key={pageIndex}
        ref={ref}
        {...bind(pageIndex)}
        animate={animate}
        custom={custom}
      >
        <div className="w-full min-h-[400px] mb-1 bg-white border border-black/10 p-2 shadow-sm">
          <span className="font-sans text-gray-400">P {pageIndex}</span>
        </div>
      </motion.div>
    );
  }
);

export default Page;

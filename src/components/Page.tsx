import { FC, useEffect, useRef } from 'react';

import { animate as framer, AnimationControls, motion } from 'framer-motion';

interface Props {
  pageIndex: number;
  pages: any[];
  bind: any;
  animate: AnimationControls;
  custom: any;
  pan: boolean;
  text?: string;
}

const Page: FC<Props> = ({
  pageIndex,
  pages,
  bind,
  animate,
  custom,
  pan,
  text,
}) => {
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
      className="w-full mb-1 bg-white border border-black/10 p-2 shadow-sm overflow-y-scroll"
      key={pageIndex}
      ref={pageRef}
      {...bind(pageIndex)}
      animate={animate}
      custom={custom}
    >
      <span className="font-sans text-gray-400">P {pageIndex + 1}</span>
      <div className="relative h-full w-full text-sm mt-2 gap-2 flex flex-col">
        <p className="highlight" ref={highlightRef}>
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default Page;

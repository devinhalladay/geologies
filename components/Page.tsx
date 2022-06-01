import { animate as framer, AnimationControls, motion } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';
import language from '../constants/language';

import { Book, Highlight } from '../lib/readwise/types';

interface Props {
  pageIndex: number;
  bind: any;
  animate: AnimationControls;
  custom: any;
  pan: boolean;
  bookmark: Highlight;
  token: string;
}

const Page: FC<Props> = ({
  pageIndex,
  bind,
  animate,
  custom,
  pan,
  bookmark,
}) => {
  const pageRef = useRef<HTMLDivElement>();
  const highlightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let topPos =
      highlightRef.current.offsetTop + highlightRef.current.clientHeight - 8;
    console.log(topPos);

    highlightRef.current.className = 'bg-moss/20';

    if (pan) {
      framer(pageRef.current.scrollTop, topPos, {
        onUpdate: (top) =>
          pageRef.current.scrollTo({ top, behavior: 'smooth' }),
      });
    }
  }, [pan]);

  return (
    <motion.div
      className="w-full mb-1 bg-white border border-black/10 pb-2 px-2 pt-1 shadow-sm overflow-y-scroll"
      key={pageIndex}
      ref={pageRef}
      {...bind(pageIndex)}
      animate={animate}
      custom={custom}
    >
      <span className="font-sans text-gray-400 text-xs uppercase tracking-wide">
        {language.article.highlight.eyebrow(pageIndex + 1)}
      </span>
      <div className="relative h-full w-full text-sm mt-2 gap-2 flex flex-col">
        <p>
          <span ref={highlightRef}>{bookmark.text}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Page;

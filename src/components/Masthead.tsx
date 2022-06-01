import { DateTime } from 'luxon';

import language from '../constants/language';

const Masthead = () => {
  const now = DateTime.now().toFormat('DDDD');
  return (
    <div className="flex w-full sm:flex-col gap-2 sm:gap-0 mt-4 sm:mt-0 justify-center text-xs font-sans tracking-tight">
      <span className="font-bold">{now}</span>
      <span>{language.navigation.masthead.eyebrow}</span>
    </div>
  );
};

export default Masthead;

import { useFeature } from 'flagged';
import { DateTime } from 'luxon';
import { GiBookshelf, GiGlobe } from 'react-icons/gi';
import NavItem from './NavItem';

function Navigation() {
  const hasLibrary = useFeature('library');
  const now = DateTime.now().toFormat('DDDD');

  return (
    <header className="relative h-[92px] sm:h-14 border-b border-dashed border-moss/40 flex items-start sm:items-center mb-10">
      <div className="flex w-full sm:flex-col gap-2 sm:gap-0 mt-4 sm:mt-0 justify-center text-xs font-sans tracking-tight">
        <span className="font-bold">{now}</span>
        <span>Today is the day</span>
      </div>
      <nav className="absolute pt-[32px] sm:pt-0 left-0 right-0 top-0 bottom-0 grow items-center flex justify-center">
        <ul className="flex items-center gap-2 uppercase tracking-wider smallcaps text-xs">
          <NavItem to="/" icon={GiGlobe} text="Geologies" />
          {hasLibrary && (
            <NavItem to="/library" icon={GiBookshelf} text="Library" />
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;

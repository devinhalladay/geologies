import { useFeature } from 'flagged';
import { GiBookshelf, GiGlobe } from 'react-icons/gi';

import Masthead from './Masthead';
import NavItem from './NavItem';

function Navigation() {
  const hasLibrary = useFeature('library');

  return (
    <header className="relative h-[92px] sm:h-14 border-b border-dashed border-moss/40 flex items-start sm:items-center mb-10">
      <Masthead />
      <nav className="absolute pt-[32px] sm:pt-0 left-0 right-0 top-0 bottom-0 grow items-center flex justify-center">
        <ul className="flex items-center gap-2 uppercase tracking-wider smallcaps text-xs">
          <NavItem href="/" icon={GiGlobe} text="Geologies" />
          {hasLibrary && (
            <NavItem href="/library" icon={GiBookshelf} text="Library" />
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;

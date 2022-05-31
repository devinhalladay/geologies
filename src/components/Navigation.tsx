import { NavLink } from 'react-router-dom';
import { GiBookshelf, GiGlobe } from 'react-icons/gi';
import cx from 'classnames';
import { DateTime } from 'luxon';
import { useFeature } from 'flagged';

function Navigation() {
  const hasLibrary = useFeature('library');
  const hasInstapaper = useFeature('instapaper');
  const hasReadwise = useFeature('readwise');

  const now = DateTime.now().toFormat('DDDD');

  return (
    <header className="relative h-[92px] sm:h-14 border-b border-dotted border-moss flex items-start sm:items-center mb-10">
      <div className="flex w-full sm:flex-col gap-2 sm:gap-0 mt-4 sm:mt-0 justify-center text-xs font-sans tracking-tight">
        <span className="font-bold">{now}</span>
        <span>Today is the day</span>
      </div>
      <nav className="absolute pt-[32px] sm:pt-0 left-0 right-0 top-0 bottom-0 grow items-center flex justify-center">
        <ul className="flex items-center gap-2 uppercase tracking-wider smallcaps text-xs">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 px-2 rounded-md',
                  {
                    'font-bold bg-moss/10 p-1 px-6  text-moss': isActive,
                    'opacity-70 p-1': !isActive,
                  }
                )
              }
            >
              <GiGlobe size="1.5em" />
              <span>Home</span>
            </NavLink>
          </li>
          {hasLibrary && (
            <li>
              <NavLink
                to="/a"
                className={({ isActive }) =>
                  cx(
                    'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 rounded-md px-2',
                    {
                      'font-bold bg-moss/10 p-1 px-6 rounded-md text-moss':
                        isActive,
                      'opacity-70 p-1': !isActive,
                    }
                  )
                }
              >
                <GiBookshelf size="1.5em" />
                <span>Library</span>
              </NavLink>
            </li>
          )}
          {hasInstapaper && (
            <li>
              <NavLink
                to="/auth/instapaper"
                className={({ isActive }) =>
                  cx(
                    'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 rounded-md px-2',
                    {
                      'font-bold bg-moss/10 p-1 px-6 rounded-md text-moss':
                        isActive,
                      'opacity-70 p-1': !isActive,
                    }
                  )
                }
              >
                <span>Instapaper</span>
              </NavLink>
            </li>
          )}
          {hasReadwise && (
            <li>
              <NavLink
                to="/readwise"
                className={({ isActive }) =>
                  cx(
                    'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 rounded-md px-2',
                    {
                      'font-bold bg-moss/10 p-1 px-6 rounded-md text-moss':
                        isActive,
                      'opacity-70 p-1': !isActive,
                    }
                  )
                }
              >
                <span>Readwise</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="absolute -bottom-[4px] left-0 right-0 h-2 border-b border-black"></div>
    </header>
  );
}

export default Navigation;

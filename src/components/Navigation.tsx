import { NavLink } from 'react-router-dom';
import { GiBookshelf, GiGlobe } from 'react-icons/gi';
import cx from 'classnames';

function Navigation() {
  return (
    <header className="relative h-14 border-b border-dotted border-black flex items-center justify-center mb-6">
      <nav>
        <ul className="flex items-center gap-2 uppercase tracking-wider smallcaps text-xs">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-1 hover:bg-black/10 transition-all duration-200 px-2 rounded-md',
                  {
                    'font-bold bg-black/10 p-1 px-6 ': isActive,
                    'opacity-70 p-1': !isActive,
                  }
                )
              }
            >
              <GiGlobe size="1.5em" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/a"
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-1 hover:bg-black/10 transition-all duration-200 rounded-md px-2',
                  {
                    'font-bold bg-black/10 p-1 px-6 rounded-md': isActive,
                    'opacity-70 p-1': !isActive,
                  }
                )
              }
            >
              <GiBookshelf size="1.5em" />
              <span>Library</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="absolute -bottom-[4px] left-0 right-0 h-2 border-b border-black"></div>
    </header>
  );
}

export default Navigation;

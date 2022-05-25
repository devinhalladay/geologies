import React from 'react';
import { Link, BrowserRouter as Router, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <header className="relative h-14 border-b border-dotted border-black flex items-center justify-center mb-6">
      <nav>
        <ul className="flex items-center gap-6 uppercase tracking-wider smallcaps text-xs">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold bg-black/10 p-1 rounded-sm'
                  : 'inactive p-1'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/a"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold bg-black/10 p-1 rounded-sm'
                  : 'inactive p-1'
              }
            >
              App
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="absolute -bottom-[4px] left-0 right-0 h-2 border-b border-black"></div>
    </header>
  );
}

export default Navigation;

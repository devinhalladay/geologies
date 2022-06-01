import cx from 'classnames';
import { FC } from 'react';
import { IconContext, IconType } from 'react-icons';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props {
  icon?: IconType;
  text: string;
}

const NavItem: FC<NavLinkProps & Props> = ({
  to,
  className,
  icon,
  text,
  ...rest
}) => {
  const Icon = icon;

  return (
    <IconContext.Provider value={{ size: '1.5em' }}>
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            cx(
              'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 px-1.5 rounded-md',
              {
                'font-bold bg-moss/10 p-1 px-6  text-moss': isActive,
                'opacity-70 p-1': !isActive,
              },
              className
            )
          }
          {...rest}
        >
          <>
            {<Icon size="1.5em" />}
            <span>{text}</span>
          </>
        </NavLink>
      </li>
    </IconContext.Provider>
  );
};

export default NavItem;

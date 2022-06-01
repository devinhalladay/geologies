import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { IconContext, IconType } from 'react-icons';

interface Props {
  icon?: IconType;
  text: string;
  href: string;
  className?: string;
}

const NavItem: FC<Props> = ({ href, className, icon, text, ...rest }) => {
  const Icon = icon;

  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <IconContext.Provider value={{ size: '1.5em' }}>
      <li>
        <Link passHref={true} href={href} {...rest}>
          <a
            className={cx(
              'flex items-center gap-1 hover:bg-moss/10 transition-all duration-200 px-1.5 rounded-md',
              {
                'font-bold bg-moss/10 p-1 px-6  text-moss': isActive,
                'opacity-70 p-1': !isActive,
              },
              className
            )}
          >
            {<Icon size="1.5em" />}
            <span>{text}</span>
          </a>
        </Link>
      </li>
    </IconContext.Provider>
  );
};

export default NavItem;

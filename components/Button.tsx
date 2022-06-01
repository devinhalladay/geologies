import React, { FC } from 'react';
import cx from 'classnames';

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  type,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cx(
        'h-10 bg-moss hover:bg-evergreen text-white rounded-md text-sm px-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

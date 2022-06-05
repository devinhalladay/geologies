import { forwardRef } from 'react';

const HighlightSpan = forwardRef<HTMLSpanElement, any>(
  ({ children, ...rest }, ref) => {
    return (
      <span ref={ref} {...rest} className="highlight">
        {children}
      </span>
    );
  }
);

export default HighlightSpan;

import { MatcherInterface, MatchResponse } from 'interweave';

import HighlightSpan from '../components/Highlight';
import { Highlight } from '../lib/readwise/types';
import { HighlightsRef } from '../types/highlights';
import { escapeForRegExp } from '../utils';

const useMatcher = (highlights: HighlightsRef) => {
  return (bookmark: Highlight): MatcherInterface => {
    return {
      inverseName: 'noFoo',
      propName: 'foo',
      match(string): MatchResponse<any> {
        const regex = new RegExp(escapeForRegExp(bookmark.text));
        const result = string.match(regex);

        if (!result) {
          return null;
        }

        return {
          index: result.index!,
          length: result[0].length,
          match: result[0],
          className: 'highlight',
          valid: true,
        };
      },
      createElement(children, props) {
        const index = highlights.current.length;

        return (
          <HighlightSpan
            ref={(el) => (highlights.current[parseInt(bookmark.location)] = el)}
            key={index}
            {...props}
          >
            {children}
          </HighlightSpan>
        );
      },
      asTag() {
        return 'span';
      },
    };
  };
};

export default useMatcher;

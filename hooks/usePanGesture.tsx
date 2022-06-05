import { animate as framer } from 'framer-motion';
import { MutableRefObject, useEffect } from 'react';

/**
 * In response to a Framer pinch gesture, shrink all content elements to the height
 * of any highlights they may contain as children. This enables the user to easily
 * bring all highlights closer together while reading.
 *
 * @param pan Indicates whether pan gesture is in progress. Value set by Framer Motion.
 * @param highlightRefs Mutable ref to an array of highlight elements.
 */
const usePanGesture = (
  pan: boolean,
  highlightRefs: MutableRefObject<HTMLSpanElement[]>
) => {
  useEffect(() => {
    const docElement = document.documentElement,
      highlights = highlightRefs.current;

    if (docElement && highlights && pan) {
      highlights.forEach((ref) => {
        /**
         * This gives us the relative top and bototm position of an individual highlight
         * by adding its distance from the top of its container to the bottom of the
         * element (its height). Note that the container must be `position: relative`.
         */
        let topPos = ref.offsetTop + ref.offsetHeight;

        framer(docElement.scrollTop, topPos, {
          onUpdate: () => {
            Array.from(
              document.querySelector<HTMLElement>('#container').children
            ).forEach((el: HTMLElement) => {
              if (el.children.length > 0) {
                // If there are children, search for non-highlight children and hide them.
                // TODO: Make this apply to TEXT_NODE as well (`node.NodeType === 3`)
                Array.from(el.children).forEach((child: HTMLElement) => {
                  if (!child.classList.contains('highlight') || !child) {
                    el.style.display = 'none';
                    el.hidden = true;
                  }
                });
              } else {
                // Else if there are no children, simply hide the entire element, because
                // we know that there will be no highlights inside.
                el.style.display = 'none';
                el.hidden = true;
              }
            });

            document
              .querySelectorAll<HTMLElement>('#container > *:not(.highlight)')
              .forEach((el) => {
                const childHighlights: HTMLElement[] = Array.from(
                  el.querySelectorAll('span.highlight')
                );

                /**
                 * Here we are doing a more complex calculation of the height for each container
                 * within a reader view. These are most likely paragraphs.
                 * In order to collapse the text blocks and obscure the surrounding content,
                 * we need to:
                 * 1. Check if there are any child highlights.
                 * 2. If there are none, hide the element.
                 * 3. If there is only one highlight, set the parent height to the height
                 *    of that singleton highlight.
                 * 4. If there is more than one highlight, set the container height to at least
                 *    the top of the first highlight.
                 */

                // TODO: This needs to be thought through more thoroughly.
                const newHeight =
                  childHighlights.length > 1
                    ? childHighlights[0].offsetTop
                    : childHighlights.length === 1
                    ? childHighlights[0].offsetHeight +
                      childHighlights[0].offsetTop
                    : 0;

                el.style.overflow = 'hidden';
                el.style.transition = 'all 0.5s ease-in-out';
                el.style.height = newHeight + 'px';
              });
          },
        });
      });
    }
  }, [pan]);
};

export default usePanGesture;

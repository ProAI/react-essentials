import { useRef, useLayoutEffect } from 'react';
import Platform from 'react-native-web/dist/cjs/exports/Platform';

const computeScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'modal-scrollbar-measure';

  document.body.appendChild(scrollDiv);

  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

export default function useScrollbarEffects({
  modalRef,
  active,
  keepBodyScroll,
  bodyClass,
  centered,
}) {
  if (Platform.OS !== 'web' || keepBodyScroll) {
    return;
  }

  const scrollbarWidth = useRef();

  useLayoutEffect(() => {
    if (!scrollbarWidth.current) {
      scrollbarWidth.current = computeScrollbarWidth();
    }

    if (!active) {
      return undefined;
    }

    // Auto-focus on open.
    modalRef.current.focus();

    // Set tab index from 0 to -1.
    // eslint-disable-next-line no-param-reassign
    modalRef.current.tabIndex = '-1';

    const rect = document.body.getBoundingClientRect();
    const isBodyOverflowing = rect.left + rect.right < window.innerWidth;

    // Set body and fixed elements padding adjustments.
    const elements = [
      document.body,
      ...document.querySelectorAll('[data-fixed="true"]'),
    ];

    const originalPaddings = elements.map(
      (element) => element.style.paddingRight || '',
    );

    const originalBodyOverflow = document.body.style.overflow || '';

    if (isBodyOverflowing) {
      elements.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.style.paddingRight = `${scrollbarWidth.current}px`;
      });
    }

    const isModalOverflowing =
      modalRef.current.scrollHeight > document.documentElement.clientHeight;

    if (centered) {
      // Set dialog padding adjustments.
      if (!isBodyOverflowing && isModalOverflowing) {
        // eslint-disable-next-line no-param-reassign
        modalRef.current.style.paddingLeft = `${scrollbarWidth.current}px`;
      }

      if (isBodyOverflowing && !isModalOverflowing) {
        // eslint-disable-next-line no-param-reassign
        modalRef.current.style.paddingRight = `${scrollbarWidth.current}px`;
      }
    }

    // Add class .modal-open to body element.
    if (bodyClass) {
      document.body.classList.add(bodyClass);
    }
    // Add "overflow: hidden" to body element.
    document.body.style.overflow = 'hidden';

    return () => {
      // Reset body padding adjustments.
      elements.forEach((element, key) => {
        // eslint-disable-next-line no-param-reassign
        element.style.paddingRight = originalPaddings[key] || '';
      });

      // Remove class .modal-open from body element.
      if (bodyClass) {
        document.body.classList.remove(bodyClass);
      }
      // Remove "overflow: hidden" to body element.
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [active]);
}

import { useRef, useEffect } from 'react';

const computeScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'modal-scrollbar-measure';

  document.body.appendChild(scrollDiv);

  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

export default function useScrollbarAdjustment({ ref: modal, active }) {
  const scrollbarWidth = useRef();

  useEffect(() => {
    if (!scrollbarWidth.current) {
      scrollbarWidth.current = computeScrollbarWidth();
    }

    if (!active) {
      return undefined;
    }

    // Auto-focus on open.
    modal.current.focus();

    // Set tab index from 0 to -1.
    // eslint-disable-next-line no-param-reassign
    modal.current.tabIndex = '-1';

    const rect = document.body.getBoundingClientRect();
    const isBodyOverflowing = rect.left + rect.right < window.innerWidth;

    // Set body padding adjustments.
    const contentElement = document.getElementById('content');
    const navbarElement = document.getElementsByClassName('navbar')[0];

    const originalContentPadding = contentElement
      ? contentElement.style.paddingRight
      : '';
    const originalNavbarPadding = navbarElement
      ? navbarElement.style.paddingRight
      : '';

    if (isBodyOverflowing) {
      if (contentElement) {
        contentElement.style.paddingRight = `${scrollbarWidth.current}px`;
      }
      if (navbarElement) {
        navbarElement.style.paddingRight = `${scrollbarWidth.current}px`;
      }
    }

    const isModalOverflowing =
      modal.current.scrollHeight > document.documentElement.clientHeight;

    // Set dialog padding adjustments.
    if (!isBodyOverflowing && isModalOverflowing) {
      // eslint-disable-next-line no-param-reassign
      modal.current.style.paddingLeft = `${scrollbarWidth.current}px`;
    }

    if (isBodyOverflowing && !isModalOverflowing) {
      // eslint-disable-next-line no-param-reassign
      modal.current.style.paddingRight = `${scrollbarWidth.current}px`;
    }

    // Add class .modal-open to body element.
    document.body.classList.add('modal-open');

    return () => {
      // Reset body padding adjustments.
      if (contentElement) {
        contentElement.style.paddingRight = originalContentPadding;
      }
      if (navbarElement) {
        navbarElement.style.paddingRight = originalNavbarPadding;
      }

      // Remove class .modal-open from body element.
      document.body.classList.remove('modal-open');
    };
  }, [active]);
}

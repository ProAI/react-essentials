import { useEffect } from 'react';

export default function useDatePickerEffects({ ref: menu, active }) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Set tabindex of wrapper element to -1, so that nav buttons are
    // selected directly.
    const wrapper = menu.current.getElementsByClassName('DayPicker-wrapper')[0];
    wrapper.tabIndex = -1;

    // Scroll to bottom of menu for better usability.
    const menuRect = menu.current.getBoundingClientRect();
    if (window.innerHeight < menuRect.bottom) {
      window.scrollBy(0, menuRect.bottom - window.innerHeight);
    }

    // Blur on month change
    const onDocumentClick = event => {
      if (event.target.className.includes('DayPicker-NavButton')) {
        event.target.blur();
      }
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [active]);
}

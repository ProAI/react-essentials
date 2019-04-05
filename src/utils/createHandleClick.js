export default function createHandleClick(ref, onClick, options) {
  return event => {
    if (onClick) {
      onClick(event);
    }

    if (!options.keepFocus) {
      ref.current.blur();
    }
  };
}

export default function createHandleClick(ref, onClick, onToggle, options) {
  return (event) => {
    if (onClick) {
      onClick(event);
    }

    if (onToggle !== undefined && !options.preventToggle) {
      onToggle();
    }

    if (!options.keepFocus) {
      ref.current.blur();
    }
  };
}

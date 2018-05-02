export default function createHandleClick(ref, props, context) {
  return (event) => {
    if (props.onClick) {
      props.onClick(event);
    }

    if (context.onToggle !== undefined && !props.preventToggle) {
      context.onToggle();
    }

    if (!props.keepFocus) {
      ref.current.blur();
    }
  };
}

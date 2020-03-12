export default function setRef(ref, element) {
  if (typeof ref === 'function') {
    ref(element);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = element;
  }
}

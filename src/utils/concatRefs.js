export default function concatRefs(...refs) {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = element;
      }
    });
  };
}

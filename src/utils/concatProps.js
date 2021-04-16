import concatRefs from './concatRefs';

export default function concatProps(elementProps, ...instances) {
  const input = [
    elementProps,
    ...instances.filter((instance) => instance).map(({ props }) => props),
  ];

  const resultProps = {};
  const refs = [];

  input.forEach(({ ref, onPress, ...props }) => {
    Object.assign(resultProps, props);

    if (ref) {
      refs.push(ref);
    }
  });

  Object.assign(resultProps, { ref: concatRefs(...refs) });

  return resultProps;
}

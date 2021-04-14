import warning from 'fbjs/lib/warning';
import setRef from './setRef';

const concatRefs = (refs) => (element) =>
  refs.forEach((ref) => {
    setRef(ref, element);
  });

const concatHandles = (handles) => (event) =>
  handles.forEach((handle) => {
    handle(event);
  });

export default function concatProps(elementProps, ...instances) {
  const input = [
    elementProps,
    ...instances.filter((instance) => instance).map(({ props }) => props),
  ];

  const resultProps = {};
  const refs = [];
  const handles = [];

  input.forEach((props) => {
    Object.assign(resultProps, props);

    if (props.ref) {
      refs.push(props.ref);
    }

    if (props.onPress) {
      handles.push(props.onPress);
    }
  });

  warning(handles.length, 'A touchable needs a toggle, to or onPress prop.');

  const ref = concatRefs(refs);

  const onPress = concatHandles(handles);

  return {
    ...resultProps,
    ref,
    onPress,
  };
}

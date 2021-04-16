import warning from 'fbjs/lib/warning';
import concatRefs from './concatRefs';

const concatHandles = (handles) => (event) =>
  handles.forEach((handle) => {
    handle(event);
  });

export default function concatTouchableProps(elementProps, ...instances) {
  const input = [
    elementProps,
    ...instances.filter((instance) => instance).map(({ props }) => props),
  ];

  const resultProps = {};
  const refs = [];
  const handles = [];

  input.forEach(({ ref, onPress, ...props }) => {
    Object.assign(resultProps, props);

    if (ref) {
      refs.push(ref);
    }

    if (onPress) {
      handles.push(onPress);
    }
  });

  warning(handles.length, 'A touchable needs a toggle, to or onPress prop.');

  Object.assign(resultProps, { ref: concatRefs(...refs) });

  const onPress = concatHandles(handles);

  if (resultProps.accessibilityRole === 'button') {
    // We use the onClick event for buttons instead of onPress, because
    // if the mouse moves while clicking the click is not detected.
    // See https://github.com/necolas/react-native-web/issues/1219
    Object.assign(resultProps, {
      onClick: (event) => {
        if (onPress) onPress(event);
        if (elementProps.onClick) elementProps.onClick(event);
      },
    });
  } else {
    Object.assign(resultProps, { onPress });
  }

  return resultProps;
}

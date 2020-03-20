import { useRef, useState, useEffect } from 'react';
import PopperJS from 'popper.js';

const formatStyle = styles => {
  const { transform, ...otherStyles } = styles;
  const [x, y] = transform.replace('translate3d(', '').split(', ', 2);

  return { transform: [{ translateX: x }, { translateY: y }], ...otherStyles };
};

export default function usePopper(config) {
  const {
    visible,
    refs: { target, wrapper, arrow },
    defaultPlacement,
    fallbackPlacement,
  } = config;

  const instance = useRef(null);

  const initialState = {
    loaded: false,
    placement: defaultPlacement,
    arrowStyle: null,
    wrapperStyle: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    instance.current = new PopperJS(target.current, wrapper.current, {
      placement: defaultPlacement,
      modifiers: {
        arrow: {
          element: arrow.current,
        },
        flip: {
          enabled: !!fallbackPlacement,
          behavior: fallbackPlacement,
        },
        applyStyle: { enabled: false },
        // The applyReactStyle modifier is a custom modifier.
        applyReactStyle: {
          enabled: true,
          fn: data => {
            setState({
              loaded: true,
              placement: data.placement,
              arrowStyle: data.offsets.arrow,
              wrapperStyle: formatStyle(data.styles),
            });

            return data;
          },
          order: 900,
        },
      },
    });

    return () => {
      instance.current.destroy();
      instance.current = null;

      setState(initialState);
    };
  }, [visible]);

  return state;
}

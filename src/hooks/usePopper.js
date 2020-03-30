import { useRef, useReducer, useEffect } from 'react';
import PopperJS from 'popper.js';

const formatStyle = styles => {
  const { transform, ...otherStyles } = styles;
  const [x, y] = transform.replace('translate3d(', '').split(', ', 2);

  return { transform: [{ translateX: x }, { translateY: y }], ...otherStyles };
};

const init = initialPlacement => ({
  status: 'INITIAL',
  placement: initialPlacement,
  arrowStyle: null,
  // In comparison to the bootstrap.js implementation we need to set a default
  // style here, because we need to mount the overlay in React first to get the
  // reference, which we use to create the popper instance.
  wrapperStyle: {
    top: 0,
    left: 0,
    opacity: 0,
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...init(action.initialPlacement),
        status: 'LOADING',
      };
    case 'reset':
      return init(action.initialPlacement);
    case 'set':
      if (state.status === 'INITIAL') {
        return state;
      }

      return {
        status: 'LOADED',
        placement: action.data.placement,
        arrowStyle: action.data.offsets.arrow,
        wrapperStyle: formatStyle(action.data.styles),
      };
    default:
      throw new Error();
  }
};

export default function usePopper(config) {
  const {
    visible,
    refs: { target, wrapper, arrow },
    delay,
    defaultPlacement: initialPlacement,
    fallbackPlacement,
  } = config;

  const instance = useRef(null);
  const timeout = useRef(null);
  const mounted = useRef(false);
  const [state, dispatch] = useReducer(reducer, initialPlacement, init);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    dispatch({ type: 'load', initialPlacement });

    instance.current = new PopperJS(target.current, wrapper.current, {
      placement: initialPlacement,
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
            clearTimeout(timeout.current);

            if (!mounted.current) {
              return data;
            }

            if (delay.show) {
              timeout.current = setTimeout(() => {
                if (!mounted.current) {
                  return;
                }

                dispatch({ type: 'set', data });
              }, delay.show);
            } else {
              dispatch({ type: 'set', data });
            }

            return data;
          },
          order: 900,
        },
      },
    });

    return () => {
      instance.current.destroy();
      instance.current = null;

      clearTimeout(timeout.current);

      if (!mounted.current) {
        return;
      }

      if (delay.hide) {
        timeout.current = setTimeout(() => {
          if (!mounted.current) {
            return;
          }

          dispatch({ type: 'reset', initialPlacement });
        }, delay.hide);
      } else {
        dispatch({ type: 'reset', initialPlacement });
      }
    };
  }, [visible]);

  return state;
}

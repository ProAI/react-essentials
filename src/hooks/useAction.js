import { useRef, useContext } from 'react';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import { __RouterContext as RouterContext } from 'react-router';
import { createLocation } from 'history';
import setRef from '../utils/setRef';

const handlePress = (event, { onPress, keepFocus }, ref) => {
  if (onPress) onPress(event);

  if (!keepFocus) {
    ref.current.blur();
  }
};

const handleRouting = (event, { replace, to }, history) => {
  if (!event.defaultPrevented) {
    event.preventDefault();

    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }
};

export default function useAction(props, ref) {
  const {
    to,
    replace = false,
    external = false,
    onPress,
    onClick,
    keepFocus,
    ...elementProps
  } = props;

  const { history, location } = useContext(RouterContext);

  const internalRef = useRef();

  const handleRef = element => {
    internalRef.current = element;
    setRef(ref, element);
  };

  // Check props.
  if (process.env.NODE_ENV !== 'production') {
    warning(
      to || onPress,
      "A touchable needs either a 'to' or an 'onPress' prop.",
    );
    if (external) {
      invariant(to, "Prop 'external' needs prop 'to'.");
    }
    if (replace) {
      invariant(to, "Prop 'replace' needs prop 'to'.");
    }
  }

  // Element has onPress.
  if (!to) {
    // TODO onKeyPress: () => {},
    return {
      ...elementProps,
      ref: handleRef,
      accessibilityRole: 'button',
      onClick: event => {
        // We use the onClick event for buttons instead of onPress, because
        // if the mouse moves while clicking the click is not detected.
        // See https://github.com/necolas/react-native-web/issues/1219
        handlePress({}, props, internalRef);

        if (onClick) onClick(event);
      },
      tabIndex: 0,
    };
  }

  // Element is external link.
  if (external) {
    return {
      ...elementProps,
      ref: handleRef,
      accessibilityRole: 'link',
      href: to,
      onPress: event => {
        handlePress(event, props, internalRef);
      },
      onClick,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  // Element is link.
  const linkLocation =
    typeof to === 'string' ? createLocation(to, null, null, location) : to;
  const href = linkLocation ? history.createHref(linkLocation) : '';

  return {
    ...elementProps,
    ref: handleRef,
    accessibilityRole: 'link',
    href,
    onPress: event => {
      handlePress(event, props, internalRef);
      handleRouting(event, props, history);
    },
    onClick,
  };
}

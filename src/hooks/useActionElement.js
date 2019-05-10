import React, { useRef, useContext } from 'react';
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

export default function useActionElement(Component, props, ref) {
  // eslint-disable-next-line react/prop-types
  const { to, replace, external, onPress, keepFocus, ...elementProps } = props;

  const { history, location } = useContext(RouterContext);

  const internalRef = useRef();
  const handleRef = value => {
    internalRef.current = value;
    setRef(ref, value);
  };

  // check props
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

  // action
  if (!to) {
    // TODO onKeyPress: () => {},
    return essentials => (
      <Component
        {...elementProps}
        ref={handleRef}
        accessibilityRole="button"
        onPress={event => {
          handlePress(event, props, internalRef);
        }}
        tabIndex={0}
        essentials={essentials}
      />
    );
  }

  // external link
  if (external) {
    return essentials => (
      <Component
        {...elementProps}
        ref={handleRef}
        accessibilityRole="link"
        href={to}
        onPress={event => {
          handlePress(event, props, internalRef);
        }}
        target="_blank"
        rel="noopener noreferrer"
        essentials={essentials}
      />
    );
  }

  // router link
  const linkLocation =
    typeof to === 'string' ? createLocation(to, null, null, location) : to;
  const href = linkLocation ? history.createHref(linkLocation) : '';

  return essentials => (
    <Component
      {...elementProps}
      ref={handleRef}
      accessibilityRole="link"
      href={href}
      onPress={event => {
        handlePress(event, props, internalRef);
        handleRouting(event, props, history);
      }}
      essentials={essentials}
    />
  );
}

import React, { useRef, useContext } from 'react';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import { __RouterContext as RouterContext } from 'react-router';
import { createLocation } from 'history';

const updateFocus = (ref, keepFocus) => {
  if (!keepFocus) {
    ref.current.blur();
  }
};

const handlePress = (event, ref, { onPress, keepFocus }) => {
  if (onPress) onPress(event);

  updateFocus(ref, keepFocus);
};

const handleRouting = (event, history, { replace, to }) => {
  if (!event.defaultPrevented) {
    event.preventDefault();

    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }
};

export default function useActionElement(Component, props) {
  // eslint-disable-next-line react/prop-types
  const { to, replace, external, onPress, keepFocus, ...elementProps } = props;

  const ref = useRef();
  const { history, location } = useContext(RouterContext);

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
        accessibilityRole="button"
        onPress={event => {
          handlePress(event, ref, props);
        }}
        tabIndex={0}
        ref={ref}
        essentials={essentials}
      />
    );
  }

  // external link
  if (external) {
    return essentials => (
      <Component
        {...elementProps}
        accessibilityRole="link"
        href={to}
        onPress={event => {
          handlePress(event, ref, props);
        }}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
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
      accessibilityRole="link"
      href={href}
      onPress={event => {
        handlePress(event, ref, props);
        handleRouting(event, history, props);
      }}
      ref={ref}
      essentials={essentials}
    />
  );
}

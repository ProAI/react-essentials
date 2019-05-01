import React, { useRef, useContext } from 'react';
import invariant from 'fbjs/lib/invariant';
import { __RouterContext as RouterContext } from 'react-router';
import { createLocation } from 'history';

const isModifiedEvent = event => {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

const updateFocus = (ref, keepFocus) => {
  if (!keepFocus) {
    ref.current.blur();
  }
};

const handleClick = (event, ref, { onClick, keepFocus }) => {
  try {
    if (onClick) onClick(event);
  } catch (ex) {
    event.preventDefault();
    throw ex;
  }

  updateFocus(ref, keepFocus);
};

const handleRouting = (event, history, { replace, to }) => {
  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    !isModifiedEvent(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault();

    const method = replace ? history.replace : history.push;

    method(to);
  }
};

export default function useActionElement(Component, props) {
  // eslint-disable-next-line react/prop-types
  const { to, replace, external, onClick, keepFocus, ...elementProps } = props;

  const ref = useRef();
  const { history, location } = useContext(RouterContext);

  // check props
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      to || handleClick,
      "A touchable needs either a 'to' or an 'onClick' prop.",
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
        onClick={event => {
          handleClick(event, ref, props);
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
        onClick={event => {
          handleClick(event, ref, props);
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
      onClick={event => {
        handleClick(event, ref, props);
        handleRouting(event, history, props);
      }}
      ref={ref}
      essentials={essentials}
    />
  );
}

import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { Link as RouterLink } from 'react-router-dom';
import createHandleClick from './createHandleClick';

export default function makeLinkProps(props, context) {
  const {
    to, external, onClick, preventToggle, keepFocus, ...elementProps
  } = props;
  const { onToggle } = context;

  const ref = React.createRef();
  const handleClick = createHandleClick(ref, onClick, onToggle, {
    preventToggle,
    keepFocus,
  });

  // check props
  if (process.env.NODE_ENV !== 'production') {
    invariant(!to && !onClick, "A button needs either a 'to' or an 'onClick' prop.");
    invariant(!to && external, "'to' prop for external link is missing.");
  }

  // action link
  if (!to) {
    return {
      ...elementProps,
      tag: 'a',
      role: 'button',
      tabIndex: 0,
      ref,
      onClick: handleClick,
      // TODO onKeyPress: () => {},
    };
  }

  // external link
  if (external) {
    return {
      ...elementProps,
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer',
      ref,
      onClick: handleClick,
    };
  }

  // router link
  return {
    ...elementProps,
    tag: RouterLink,
    to,
    innerRef: ref,
    onClick: handleClick,
  };
}

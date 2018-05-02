import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { Link as RouterLink } from 'react-router-dom';
import createHandleClick from './createHandleClick';

export default function makeLinkProps(props, context) {
  const ref = React.createRef();
  const handleClick = createHandleClick(ref, props, context);

  // check props
  if (process.env.NODE_ENV !== 'production') {
    invariant(!props.to && !props.onClick, "A button needs either a 'to' or an 'onClick' prop.");
    invariant(!props.to && props.external, "'to' prop for external link is missing.");
  }

  // action link
  if (!props.to) {
    return {
      tag: 'a',
      role: 'button',
      tabIndex: 0,
      ref,
      onClick: handleClick,
      // TODO onKeyPress: () => {},
    };
  }

  // external link
  if (props.external) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener noreferrer',
      ref,
      onClick: handleClick,
    };
  }

  // router link
  return {
    tag: RouterLink,
    to: props.to,
    innerRef: ref,
    onClick: handleClick,
  };
}

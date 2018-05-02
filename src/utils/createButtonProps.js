import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { Link as RouterLink } from 'react-router-dom';
import createHandleClick from './createHandleClick';

export default function createButtonProps(props, context) {
  const ref = React.createRef();
  const handleClick = createHandleClick(ref, props, context);

  // check props
  if (process.env.NODE_ENV !== 'production') {
    invariant(!props.to && !props.onClick, "A button needs either a 'to' or an 'onClick' prop.");
    invariant(!props.to && props.external, "'to' prop for external link is missing.");
  }

  // link button
  if (props.to) {
    return {
      tag: RouterLink,
      to: props.to,
      innerRef: ref,
      onClick: handleClick,
    };
  }

  // external link button
  if (props.to && props.external) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener noreferrer',
      ref,
      onClick: handleClick,
    };
  }

  // button
  return {
    tag: 'button',
    ref,
    onClick: handleClick,
    // TODO onKeyPress: () => {},
  };
}

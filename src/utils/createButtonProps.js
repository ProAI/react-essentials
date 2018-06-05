import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { Link as RouterLink } from 'react-router-dom';
import createHandleClick from './createHandleClick';

export default function createButtonProps(props, context) {
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
  /* if (process.env.NODE_ENV !== 'production') {
    const isFormButton =
      elementProps.type && (elementProps.type === 'submit' || elementProps.type === 'reset');

    invariant(to || onClick || isFormButton, "A button needs either a 'to' or an 'onClick' prop.");

    if (external) {
      invariant(to, "'to' prop for external link is missing.");
    }
  } */

  // link button
  if (to) {
    return {
      tag: RouterLink,
      props: {
        ...elementProps,
        to,
        innerRef: (c) => {
          ref.current = c;
        },
        onClick: handleClick,
      },
    };
  }

  // external link button
  if (external) {
    return {
      tag: 'a',
      props: {
        ...elementProps,
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer',
        ref,
        onClick: handleClick,
      },
    };
  }

  // button
  return {
    tag: 'button',
    props: {
      ...elementProps,
      ref,
      onClick: handleClick,
      // TODO onKeyPress: () => {},
    },
  };
}

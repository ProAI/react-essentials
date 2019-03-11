import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { Link as RouterLink } from 'react-router-dom';
import createHandleClick from './createHandleClick';

export default function makeLinkProps(props, context) {
  const { to, external, onClick, preventToggle, keepFocus, ...elementProps } = props;
  const { onToggle } = context;

  const ref = React.createRef();
  const handleClick = createHandleClick(ref, onClick, onToggle, {
    preventToggle,
    keepFocus,
  });

  // check props
  if (process.env.NODE_ENV !== 'production') {
    invariant(to || onClick, "A link needs either a 'to' or an 'onClick' prop.");
    if (external) {
      invariant(to, "'to' prop for external link is missing.");
    }
  }

  // action link
  if (!to) {
    return {
      tag: 'a',
      props: {
        ...elementProps,
        role: 'button',
        tabIndex: 0,
        ref,
        onClick: handleClick,
        // TODO onKeyPress: () => {},
      },
    };
  }

  // external link
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

  // router link
  return {
    tag: RouterLink,
    props: {
      ...elementProps,
      to,
      innerRef: c => {
        ref.current = c;
      },
      onClick: handleClick,
    },
  };
}

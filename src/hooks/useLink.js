import { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import { __RouterContext as RouterContext } from 'react-router';
import { createLocation } from 'history';

export const LinkPropTypes = {
  to: PropTypes.string,
  replace: PropTypes.bool,
  external: PropTypes.bool,
};

export default function useLink(to, replace, external) {
  if (external) {
    invariant(to, "'external' needs 'to' value.");
  }
  if (replace) {
    invariant(to, "'replace' needs 'to' value.");
  }

  if (!to) {
    return undefined;
  }

  // Element is link.
  const { history, location } = useContext(RouterContext);

  if (external) {
    return {
      props: {
        accessibilityRole: 'link',
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    };
  }

  const linkLocation =
    typeof to === 'string' ? createLocation(to, null, null, location) : to;
  const href = linkLocation ? history.createHref(linkLocation) : '';

  return {
    props: {
      accessibilityRole: 'link',
      href,
      onPress: (event) => {
        if (event.defaultPrevented) {
          return;
        }

        event.preventDefault();

        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
        }
      },
    },
  };
}

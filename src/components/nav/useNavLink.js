import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { __RouterContext as RouterContext, matchPath } from 'react-router';
import useLink, { LinkPropTypes } from '../../hooks/useLink';
import optional from '../../utils/optional';

export const NavLinkPropTypes = {
  ...LinkPropTypes,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};

export default function useNavLink(to, replace, external, exact, strict) {
  if (!to) {
    return undefined;
  }

  const link = useLink(to, replace, external);

  const { location } = useContext(RouterContext);

  // Determine whether active link or not.
  const activeLink = useMemo(() => {
    const path = typeof to === 'object' ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath =
      path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

    const pathToMatch = location.pathname;

    const match = escapedPath
      ? matchPath(pathToMatch, { path: escapedPath, exact, strict })
      : null;

    return !!match;
  }, [location.pathname]);

  const classes = cx(activeLink && 'active');

  const props = {
    ...link.props,
    ...optional(activeLink, { 'aria-current': 'page' }),
  };

  return {
    props,
    classes,
  };
}

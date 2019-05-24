import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { __RouterContext as RouterContext, matchPath } from 'react-router';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  isActive: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
};
const defaultProps = {
  ...action.defaultProps,
  exact: false,
  strict: false,
};

const NavLink = React.forwardRef(function NavLink(props, ref) {
  const {
    exact,
    strict,
    isActive: isActiveProp,
    location: locationProp,
    ...elementProps
  } = props;

  const context = useContext(RouterContext);
  const createElement = useActionElement(BaseTouchable, elementProps, ref);

  const path = typeof props.to === 'object' ? props.to.pathname : props.to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  const pathToMatch = locationProp
    ? locationProp.pathname
    : context.location.pathname;

  const match = escapedPath
    ? matchPath(pathToMatch, { path: escapedPath, exact, strict })
    : null;

  const isActive = !!(isActiveProp
    ? isActiveProp(match, context.location)
    : match);

  const classes = cx(
    // constant classes
    'nav-link',
    // variable classes
    isActive && 'active',
  );

  return createElement({
    className: classes,
  });
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

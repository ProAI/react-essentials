import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Route, Link as RouterLink } from 'react-router-dom';
import { BaseView } from '../../utils/components';
import { action, formatChildren } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  raw: PropTypes.bool,
};
const defaultProps = {
  ...action.defaultProps,
  exact: false,
  strict: false,
  raw: false,
};

function NavLink(props, context) {
  const {
    children,
    to,
    external,
    onClick,
    preventToggle,
    keepFocus,
    exact,
    strict,
    raw,
    ...elementProps
  } = props;
  const { onToggle } = context;

  const ref = React.createRef();
  const handleClick = action.createHandleClick(ref, onClick, onToggle, {
    preventToggle,
    keepFocus,
  });

  const path = typeof to === 'object' ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      render={({ match }) => {
        const classes = cx(
          // constant classes
          'nav-link',
          // variable classes
          match && 'active',
        );

        return (
          <BaseView
            tag={RouterLink}
            props={{
              ...elementProps,
              to,
              innerRef: ref,
              onClick: handleClick,
            }}
            className={classes}
          >
            {formatChildren(children, raw)}
          </BaseView>
        );
      }}
    />
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Route, Link as RouterLink } from 'react-router-dom';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};
const defaultProps = {
  ...action.defaultProps,
  exact: false,
  strict: false,
};

function NavLink(props, context) {
  const {
    to, external, onClick, preventToggle, keepFocus, exact, strict, ...elementProps
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
          <BaseText
            elementProps={elementProps}
            tag={RouterLink}
            to={to}
            innerRef={ref}
            onClick={handleClick}
            className={classes}
          />
        );
      }}
    />
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

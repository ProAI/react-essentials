import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Route, Link as RouterLink } from 'react-router-dom';
import { BaseTouchable } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
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
    children,
    to,
    external,
    onClick,
    preventToggle,
    keepFocus,
    exact,
    strict,
    ...elementProps
  } = props;
  const { onToggle } = context;

  const ref = React.createRef();
  const handleClick = action.createHandleClick(ref, onClick, onToggle, {
    preventToggle,
    keepFocus,
  });

  const path = typeof to === 'object' ? to.pathname : to;

  return (
    /* eslint-disable react/no-children-prop */
    <Route
      path={path}
      exact={exact}
      strict={strict}
      children={({ match }) => {
        const classes = cx(
          // constant classes
          'nav-link',
          // variable classes
          match && 'active',
        );

        return (
          <BaseTouchable
            tag={RouterLink}
            props={{
              ...elementProps,
              to,
              innerRef: c => {
                ref.current = c;
              },
              onClick: handleClick,
            }}
            className={classes}
          >
            {children}
          </BaseTouchable>
        );
      }}
    />
    /* eslint-enable */
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

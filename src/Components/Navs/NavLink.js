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
          <BaseView
            tag={RouterLink}
            props={{
              ...elementProps,
              to,
              innerRef: (c) => {
                ref.current = c;
              },
              onClick: handleClick,
            }}
            className={classes}
          >
            {formatChildren(children, raw)}
          </BaseView>
        );
      }}
    />
    /* eslint-enable */
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

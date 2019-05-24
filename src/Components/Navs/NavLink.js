import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Route } from 'react-router';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

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

const NavLink = React.forwardRef(function NavLink(props, ref) {
  const { exact, strict, ...elementProps } = props;

  const createElement = useActionElement(BaseTouchable, elementProps, ref);

  const path = typeof props.to === 'object' ? props.to.pathname : props.to;

  return (
    <Route path={path} exact={exact} strict={strict}>
      {({ match }) => {
        const classes = cx(
          // constant classes
          'nav-link',
          // variable classes
          match && 'active',
        );

        return createElement({
          className: classes,
        });
      }}
    </Route>
  );
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

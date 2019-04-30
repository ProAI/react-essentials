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

function NavLink(props) {
  const { exact, strict, ...elementProps } = props;
  const { to } = props;

  const createElement = useActionElement(BaseTouchable, elementProps);

  const path = typeof to === 'object' ? to.pathname : to;

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
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;

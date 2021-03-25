import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import useMedia from '../../hooks/useMedia';
import NavbarContext from './NavbarContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const NavbarCollapse = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  const media = useMedia();
  const context = useContext(NavbarContext);

  if (
    !context.expanded &&
    context.expand !== true &&
    !(context.expand && media.up(context.expand))
  ) {
    return null;
  }

  const classes = cx(
    // constant classes
    'collapse',
    'navbar-collapse',
  );

  return (
    <BaseView
      {...elementProps}
      id={context.identifier}
      ref={ref}
      essentials={{ className: classes }}
    />
  );
});

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;

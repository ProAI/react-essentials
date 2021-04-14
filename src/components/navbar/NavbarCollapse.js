import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import useTarget from '../../hooks/useTarget';
import concatClasses from '../../utils/concatClasses';
import concatProps from '../../utils/concatProps';
import NavbarContext from './NavbarContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const NavbarCollapse = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  const target = useTarget(NavbarContext);

  const classes = cx(
    // constant classes
    'collapse',
    'navbar-collapse',
    // variable classes
    ...concatClasses(target),
  );

  return (
    <BaseView
      {...concatProps({ ...elementProps, ref }, target)}
      essentials={{ className: classes }}
    />
  );
});

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;

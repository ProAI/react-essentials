import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  triggerId: PropTypes.string,
};

const DropdownMenu = React.forwardRef(function DropdownMenu(props, ref) {
  const { right = false, triggerId, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'dropdown-menu',
    // variable classes
    right && 'dropdown-menu-right',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      aria-labelledby={triggerId}
      essentials={{ className: classes }}
    />
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;

export default DropdownMenu;

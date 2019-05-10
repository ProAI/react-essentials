import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  triggerId: PropTypes.string,
};

const defaultProps = {
  triggerId: null,
};

const DropdownMenu = React.forwardRef(function DropdownMenu(props, ref) {
  const { triggerId, ...elementProps } = props;

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      aria-labelledby={triggerId}
      essentials={{ className: 'dropdown-menu' }}
    />
  );
});

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;

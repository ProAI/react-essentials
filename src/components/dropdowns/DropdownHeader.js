import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const DropdownHeader = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    accessibilityRole="heading"
    aria-level={6}
    essentials={{ className: 'dropdown-header' }}
  />
));

DropdownHeader.displayName = 'DropdownHeader';
DropdownHeader.propTypes = propTypes;

export default DropdownHeader;

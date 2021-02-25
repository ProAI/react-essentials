import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ButtonGroup = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    accessibilityRole="group"
    essentials={{ className: 'btn-group' }}
  />
));

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = propTypes;

export default ButtonGroup;

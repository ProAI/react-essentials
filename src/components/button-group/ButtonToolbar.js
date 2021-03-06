import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ButtonToolbar = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    accessibilityRole="toolbar"
    essentials={{ className: 'btn-toolbar' }}
  />
));

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = propTypes;

export default ButtonToolbar;

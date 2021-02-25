import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const PopoverBody = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'popover-body' }} />
));

PopoverBody.displayName = 'PopoverBody';
PopoverBody.propTypes = propTypes;

export default PopoverBody;

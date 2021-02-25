import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CardHeader = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'card-header' }} />
));

CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = propTypes;

export default CardHeader;

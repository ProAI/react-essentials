import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CardFooter = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'card-footer' }} />
));

CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = propTypes;

export default CardFooter;

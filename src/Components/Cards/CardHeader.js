import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CardHeader = React.forwardRef(function CardHeader(props, ref) {
  return (
    <BaseView {...props} ref={ref} essentials={{ className: 'card-header' }} />
  );
});

CardHeader.propTypes = propTypes;

export default CardHeader;

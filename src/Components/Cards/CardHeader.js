import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardHeader(elementProps) {
  return (
    <BaseView {...elementProps} essentials={{ className: 'card-header' }} />
  );
}

CardHeader.propTypes = propTypes;

export default CardHeader;

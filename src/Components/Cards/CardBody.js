import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardBody(elementProps) {
  return <BaseView {...elementProps} essentials={{ className: 'card-body' }} />;
}

CardBody.propTypes = propTypes;

export default CardBody;

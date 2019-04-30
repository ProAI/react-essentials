import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardFooter(elementProps) {
  return (
    <BaseView {...elementProps} essentials={{ className: 'card-footer' }} />
  );
}

CardFooter.propTypes = propTypes;

export default CardFooter;

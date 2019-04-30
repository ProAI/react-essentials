import React from 'react';
import PropTypes from 'prop-types';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Card(elementProps) {
  return <BaseView {...elementProps} essentials={{ className: 'card' }} />;
}

Card.propTypes = propTypes;

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

export default Card;

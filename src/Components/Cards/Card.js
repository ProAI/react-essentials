import React from 'react';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BaseView } from '../../utils/components';

function Card({ ...otherProps }) {
  return <BaseView {...otherProps} className="card" />;
}

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

export default Card;

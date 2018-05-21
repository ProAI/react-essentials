import React from 'react';
import PropTypes from 'prop-types';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Card({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="card">
      {children}
    </BaseView>
  );
}

Card.propTypes = propTypes;

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

export default Card;

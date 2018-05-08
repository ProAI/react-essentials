import React from 'react';
import PropTypes from 'prop-types';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardLink from './CardLink';
import CardParagraph from './CardParagraph';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';
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
Card.Link = CardLink;
Card.Paragraph = CardParagraph;
Card.Subtitle = CardSubtitle;
Card.Title = CardTitle;

export default Card;

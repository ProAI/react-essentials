import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function CardParagraph({ children, ...elementProps }) {
  return (
    <BaseText tag="p" props={elementProps} className="card-text" blockOnly>
      {children}
    </BaseText>
  );
}

CardParagraph.propTypes = propTypes;

export default CardParagraph;

import React from 'react';
import { BaseText } from '../../utils/components';

function CardParagraph({ ...otherProps }) {
  return <BaseText {...otherProps} tag="p" className="card-text" blockOnly />;
}

export default CardParagraph;

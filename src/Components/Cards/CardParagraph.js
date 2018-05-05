import React from 'react';
import { BaseText } from '../../utils/components';

function CardParagraph({ ...elementProps }) {
  return <BaseText elementProps={elementProps} tag="p" className="card-text" blockOnly />;
}

export default CardParagraph;

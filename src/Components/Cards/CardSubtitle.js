import React from 'react';
import { BaseText } from '../../utils/components';

function CardSubtitle({ ...elementProps }) {
  return <BaseText elementProps={elementProps} tag="h6" className="card-subtitle" blockOnly />;
}

export default CardSubtitle;

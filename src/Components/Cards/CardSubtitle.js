import React from 'react';
import { BaseText } from '../../utils/components';

function CardSubtitle({ ...otherProps }) {
  return <BaseText {...otherProps} tag="h6" className="card-subtitle" blockOnly />;
}

export default CardSubtitle;

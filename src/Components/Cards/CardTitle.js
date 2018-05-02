import React from 'react';
import { BaseText } from '../../utils/components';

function CardTitle({ ...otherProps }) {
  return <BaseText {...otherProps} tag="h5" className="card-title" blockOnly />;
}

export default CardTitle;

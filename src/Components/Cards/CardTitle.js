import React from 'react';
import { BaseText } from '../../utils/components';

function CardTitle({ ...elementProps }) {
  return <BaseText props={elementProps} tag="h5" className="card-title" blockOnly />;
}

export default CardTitle;

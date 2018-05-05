import React from 'react';
import { BaseView } from '../../utils/components';

function CardHeader({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="card-header" />;
}

export default CardHeader;

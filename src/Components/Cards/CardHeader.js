import React from 'react';
import { BaseView } from '../../utils/components';

function CardHeader({ ...elementProps }) {
  return <BaseView props={elementProps} className="card-header" />;
}

export default CardHeader;

import React from 'react';
import { BaseView } from '../../utils/components';

function CardHeader({ ...otherProps }) {
  return <BaseView {...otherProps} className="card-header" />;
}

export default CardHeader;

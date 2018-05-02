import React from 'react';
import { BaseView } from '../../utils/components';

function CardBody({ ...otherProps }) {
  return <BaseView {...otherProps} className="card-body" />;
}

export default CardBody;

import React from 'react';
import { BaseView } from '../../utils/components';

function CardBody({ ...elementProps }) {
  return <BaseView props={elementProps} className="card-body" />;
}

export default CardBody;

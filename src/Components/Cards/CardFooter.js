import React from 'react';
import { BaseView } from '../../utils/components';

function CardFooter({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="card-footer" />;
}

export default CardFooter;

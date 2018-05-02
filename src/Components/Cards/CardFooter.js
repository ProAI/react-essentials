import React from 'react';
import { BaseView } from '../../utils/components';

function CardFooter({ ...otherProps }) {
  return <BaseView {...otherProps} className="card-footer" />;
}

export default CardFooter;

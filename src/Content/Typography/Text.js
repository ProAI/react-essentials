import React from 'react';
import { BaseText } from '../../utils/components';

function Text({ ...elementProps }) {
  return <BaseText props={elementProps} className="" />;
}

export default Text;

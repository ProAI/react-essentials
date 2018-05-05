import React from 'react';
import { BaseText } from '../../utils/components';

function Text({ ...otherProps }) {
  return <BaseText {...otherProps} className="" />;
}

export default Text;

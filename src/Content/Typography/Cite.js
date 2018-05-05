import React from 'react';
import { BaseText } from '../../utils/components';

function Cite({ ...otherProps }) {
  return <BaseText {...otherProps} tag="cite" className="" inlineOnly />;
}

export default Cite;

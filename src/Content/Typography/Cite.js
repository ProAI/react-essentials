import React from 'react';
import { BaseText } from '../../utils/components';

function Cite({ ...elementProps }) {
  return <BaseText props={elementProps} tag="cite" className="" inlineOnly />;
}

export default Cite;

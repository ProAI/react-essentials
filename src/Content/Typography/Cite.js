import React from 'react';
import { BaseText } from '../../utils/components';

function Cite({ ...elementProps }) {
  return <BaseText elementProps={elementProps} tag="cite" className="" inlineOnly />;
}

export default Cite;

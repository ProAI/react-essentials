import React from 'react';
import { BaseView } from '../../utils/components';

function View({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="" />;
}

export default View;

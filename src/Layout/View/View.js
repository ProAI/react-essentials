import React from 'react';
import { BaseView } from '../../utils/components';

function View({ ...elementProps }) {
  return <BaseView props={elementProps} className="" />;
}

export default View;

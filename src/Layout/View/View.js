import React from 'react';
import { BaseView } from '../../utils/components';

function View({ ...otherProps }) {
  return <BaseView {...otherProps} className="" />;
}

export default View;

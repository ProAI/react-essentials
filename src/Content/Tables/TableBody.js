import React from 'react';
import { BaseView } from '../../utils/components';

function TableBody({ ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return <BaseView pseudo tag="tbody" props={elementProps} className="" />;
}

export default TableBody;

import React from 'react';
import { BaseView } from '../../utils/components';

function TableRow({ ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return <BaseView pseudo tag="tr" props={elementProps} className="" />;
}

export default TableRow;

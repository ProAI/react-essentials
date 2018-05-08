import React from 'react';
import { BaseView } from '../../utils/components';

function TableFooter({ ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return <BaseView pseudo tag="tfoot" props={elementProps} className="" />;
}

export default TableFooter;

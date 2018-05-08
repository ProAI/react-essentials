import React from 'react';
import { BaseView } from '../../utils/components';

function TableHeader({ ...elementProps }) {
  // TODO: Remove pseudo view and add react-native compatible component
  return <BaseView pseudo tag="thead" props={elementProps} className="" />;
}

export default TableHeader;

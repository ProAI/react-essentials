import React from 'react';
import { BaseView } from '../../utils/components';

function DropdownDivider({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="dropdown-divider" withoutChildren />;
}

export default DropdownDivider;

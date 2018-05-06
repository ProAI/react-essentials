import React from 'react';
import { BaseText } from '../../utils/components';

function DropdownHeader({ ...elementProps }) {
  return <BaseText props={elementProps} tag="h6" className="dropdown-header" blockOnly />;
}

export default DropdownHeader;

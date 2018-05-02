import React from 'react';
import { BaseText } from '../../utils/components';

function DropdownHeader({ ...otherProps }) {
  return <BaseText {...otherProps} tag="h6" className="dropdown-header" blockOnly />;
}

export default DropdownHeader;

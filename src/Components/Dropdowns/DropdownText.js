import React from 'react';
import { BaseText } from '../../utils/components';

function DropdownText({ ...otherProps }) {
  return <BaseText {...otherProps} tag="span" className="dropdown-item-text" blockOnly />;
}

export default DropdownText;

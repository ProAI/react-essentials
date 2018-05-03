import React from 'react';
import { BaseText } from '../../utils/components';

function DropdownItem({ ...otherProps }) {
  return <BaseText {...otherProps} tag="span" className="dropdown-item-text" blockOnly />;
}

export default DropdownItem;

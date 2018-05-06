import React from 'react';
import { BaseText } from '../../utils/components';

function DropdownText({ ...elementProps }) {
  return <BaseText props={elementProps} tag="span" className="dropdown-item-text" blockOnly />;
}

export default DropdownText;

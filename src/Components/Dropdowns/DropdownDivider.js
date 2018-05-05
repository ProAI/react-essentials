import React from 'react';
import { BaseView } from '../../utils/components';

function DropdownDivider({ ...otherProps }) {
  return <BaseView {...otherProps} className="dropdown-divider" withoutChildren />;
}

export default DropdownDivider;

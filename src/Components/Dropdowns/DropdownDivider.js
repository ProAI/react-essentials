import React from 'react';
import BaseView from '../../utils/rnw-compat/BaseView';

function DropdownDivider({ ...elementProps }) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ className: 'dropdown-divider' }}
    />
  );
}

export default DropdownDivider;

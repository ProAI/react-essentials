import React from 'react';
import BaseView from '../../utils/rnw-compat/BaseView';

const DropdownDivider = React.forwardRef(function DropdownDivider(props, ref) {
  return (
    <BaseView
      {...props}
      ref={ref}
      essentials={{ className: 'dropdown-divider' }}
    />
  );
});

export default DropdownDivider;

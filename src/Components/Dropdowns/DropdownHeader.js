import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownHeader(elementProps) {
  return (
    <BaseView
      {...elementProps}
      essentials={{ tag: 'h6', className: 'dropdown-header' }}
    />
  );
}

DropdownHeader.propTypes = propTypes;

export default DropdownHeader;

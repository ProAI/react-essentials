import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownHeader({ children, ...elementProps }) {
  return (
    <BaseText tag="h6" props={elementProps} className="dropdown-header" blockOnly>
      {children}
    </BaseText>
  );
}

DropdownHeader.propTypes = propTypes;

export default DropdownHeader;

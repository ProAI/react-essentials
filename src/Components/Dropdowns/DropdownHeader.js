import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownHeader({ children, ...elementProps }) {
  return (
    <BaseView tag="h6" props={elementProps} className="dropdown-header" blockOnly>
      {children}
    </BaseView>
  );
}

DropdownHeader.propTypes = propTypes;

export default DropdownHeader;

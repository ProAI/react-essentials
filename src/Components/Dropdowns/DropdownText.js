import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownText({ children, ...elementProps }) {
  return (
    <BaseText tag="span" props={elementProps} className="dropdown-item-text" blockOnly>
      {children}
    </BaseText>
  );
}

DropdownText.propTypes = propTypes;

export default DropdownText;

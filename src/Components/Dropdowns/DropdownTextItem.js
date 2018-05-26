import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownTextItem({ children, ...elementProps }) {
  return (
    <BaseView tag="span" props={elementProps} className="dropdown-item-text" blockOnly>
      {children}
    </BaseView>
  );
}

DropdownTextItem.propTypes = propTypes;

export default DropdownTextItem;

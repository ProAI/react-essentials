import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const DropdownTextItem = React.forwardRef((props, ref) => (
  <BaseView
    {...props}
    ref={ref}
    essentials={{
      tag: 'span',
      className: 'dropdown-item-text',
    }}
  />
));

DropdownTextItem.displayName = 'DropdownTextItem';
DropdownTextItem.propTypes = propTypes;

export default DropdownTextItem;

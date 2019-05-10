import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

const DropdownItem = React.forwardRef(function DropdownItem(props, ref) {
  const createElement = useActionElement(BaseTouchable, props, ref);

  return createElement({
    className: 'dropdown-item',
  });
});

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;

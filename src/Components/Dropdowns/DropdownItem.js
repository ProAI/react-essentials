import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import { actionPropTypes, actionDefaultProps } from '../../utils/props';

const propTypes = {
  ...actionPropTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...actionDefaultProps,
};

const DropdownItem = React.forwardRef(function DropdownItem(props, ref) {
  const createElement = useActionElement(BaseTouchable, props, ref);

  return createElement({
    className: 'dropdown-item',
  });
});

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;

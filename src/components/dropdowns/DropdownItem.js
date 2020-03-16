import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction from '../../hooks/useAction';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const DropdownItem = React.forwardRef(function DropdownItem(props, ref) {
  const { ...elementProps } = props;

  const actionProps = useAction(elementProps, ref);

  return (
    <BaseTouchable
      {...actionProps}
      essentials={{ className: 'dropdown-item' }}
    />
  );
});

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;

export default DropdownItem;

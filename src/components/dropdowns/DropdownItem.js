import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { applyDisabled } from '../../utils/states';
import useAction from '../../hooks/useAction';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const DropdownItem = React.forwardRef((props, ref) => {
  const { disabled = false, active = false, ...actionProps } = useAction(
    props,
    ref,
  );

  // create component classes
  const classes = cx(
    // constant classes
    'dropdown-item',
    // variable classes
    active && 'active',
    disabled && 'disabled',
  );

  return (
    <BaseTouchable
      {...applyDisabled(actionProps, disabled)}
      essentials={{ className: classes }}
    />
  );
});

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;

export default DropdownItem;

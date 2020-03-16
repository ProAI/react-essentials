import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction from '../../hooks/useAction';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const ActionListGroupItem = React.forwardRef(function ActionListGroupItem(
  props,
  ref,
) {
  const { disabled = false, active = false, ...elementProps } = props;

  const actionProps = useAction({ ...elementProps, disabled }, ref);

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  return <BaseTouchable {...actionProps} essentials={{ className: classes }} />;
});

ActionListGroupItem.displayName = 'ActionListGroupItem';
ActionListGroupItem.propTypes = propTypes;

export default ActionListGroupItem;

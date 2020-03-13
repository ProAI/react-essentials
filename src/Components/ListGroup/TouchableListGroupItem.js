import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import { actionPropTypes, actionDefaultProps } from '../../utils/props';

const propTypes = {
  ...actionPropTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const defaultProps = {
  ...actionDefaultProps,
  disabled: false,
  active: false,
};

const ActionListGroupItem = React.forwardRef(function ActionListGroupItem(
  props,
  ref,
) {
  const { disabled, active, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  const createElement = useActionElement(
    BaseTouchable,
    {
      disabled,
      ...elementProps,
    },
    ref,
  );

  return createElement({
    className: classes,
  });
});

ActionListGroupItem.displayName = 'ActionListGroupItem';
ActionListGroupItem.propTypes = propTypes;
ActionListGroupItem.defaultProps = defaultProps;

export default ActionListGroupItem;

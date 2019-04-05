import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseTouchable } from '../../utils/components';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const defaultProps = {
  ...action.defaultProps,
  disabled: false,
  active: false,
};

function ActionListGroupItem(props) {
  const { children, disabled, active, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  const linkProps = action.createLinkProps(elementProps);

  return (
    <BaseTouchable {...linkProps} className={classes} blockOnly>
      {children}
    </BaseTouchable>
  );
}

ActionListGroupItem.propTypes = propTypes;
ActionListGroupItem.defaultProps = defaultProps;

export default ActionListGroupItem;

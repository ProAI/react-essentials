import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  disabled: false,
  active: false,
};

function ListGroupButton(props, context) {
  const {
    children, disabled, active, ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    active && 'active',
  );

  const buttonProps = action.createButtonProps({ ...elementProps, disabled }, context);

  return (
    <BaseText {...buttonProps} className={classes} blockOnly>
      {children}
    </BaseText>
  );
}

ListGroupButton.propTypes = propTypes;
ListGroupButton.contextTypes = contextTypes;
ListGroupButton.defaultProps = defaultProps;

export default ListGroupButton;

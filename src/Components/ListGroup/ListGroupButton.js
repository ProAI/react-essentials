import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const defaultProps = {
  ...action.defaultProps,
  disabled: false,
  active: false,
};

function ListGroupButton(props, context) {
  const { disabled, active, ...otherProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    active && 'active',
  );

  const buttonProps = action.createButtonProps(otherProps, context);

  return <BaseText {...buttonProps} disabled={disabled} className={classes} blockOnly />;
}

ListGroupButton.propTypes = propTypes;
ListGroupButton.defaultProps = defaultProps;

export default ListGroupButton;

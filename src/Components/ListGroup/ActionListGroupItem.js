import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { action, formatChildren } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  raw: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  disabled: false,
  active: false,
  raw: false,
};

function ActionListGroupItem(props, context) {
  const {
    children, disabled, active, raw, ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseView {...linkProps} className={classes} blockOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

ActionListGroupItem.propTypes = propTypes;
ActionListGroupItem.contextTypes = contextTypes;
ActionListGroupItem.defaultProps = defaultProps;

export default ActionListGroupItem;

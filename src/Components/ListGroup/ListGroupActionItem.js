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

function ListGroupActionItem(props, context) {
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

ListGroupActionItem.propTypes = propTypes;
ListGroupActionItem.contextTypes = contextTypes;
ListGroupActionItem.defaultProps = defaultProps;

export default ListGroupActionItem;

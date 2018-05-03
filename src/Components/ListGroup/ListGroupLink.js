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

function ListGroupLink(props, context) {
  const { disabled, active, ...otherProps } = props;

  const classes = cx(
    // constant classes
    'list-group-item',
    'list-group-item-action',
    // variable classes
    disabled && 'disabled',
    active && 'active',
  );

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className={classes} blockOnly />;
}

ListGroupLink.propTypes = propTypes;
ListGroupLink.defaultProps = defaultProps;

export default ListGroupLink;

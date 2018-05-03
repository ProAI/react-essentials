import React from 'react';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function DropdownLinkItem(props, context) {
  const { ...otherProps } = props;

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className="dropdown-item" blockOnly />;
}

DropdownLinkItem.propTypes = propTypes;
DropdownLinkItem.defaultProps = defaultProps;

export default DropdownLinkItem;

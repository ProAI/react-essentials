import React from 'react';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function DropdownLink(props, context) {
  const { ...otherProps } = props;

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className="dropdown-item" blockOnly />;
}

DropdownLink.propTypes = propTypes;
DropdownLink.defaultProps = defaultProps;

export default DropdownLink;

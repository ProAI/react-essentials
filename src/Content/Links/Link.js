import React from 'react';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function Link(props, context) {
  const { ...otherProps } = props;

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className="" />;
}

Link.propTypes = propTypes;
Link.contextTypes = contextTypes;
Link.defaultProps = defaultProps;

export default Link;

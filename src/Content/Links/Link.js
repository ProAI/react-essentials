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
  const { ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return <BaseText {...linkProps} className="" />;
}

Link.propTypes = propTypes;
Link.contextTypes = contextTypes;
Link.defaultProps = defaultProps;

export default Link;

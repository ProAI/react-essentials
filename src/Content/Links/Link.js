import React from 'react';
import PropTypes from 'prop-types';
import { BaseText } from '../../utils/components';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
};

function Link(props, context) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseText {...linkProps} className="">
      {children}
    </BaseText>
  );
}

Link.propTypes = propTypes;
Link.contextTypes = contextTypes;
Link.defaultProps = defaultProps;

export default Link;

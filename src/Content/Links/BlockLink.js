import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
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

function BlockLink(props, context) {
  const { children, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseView {...linkProps} className="">
      {children}
    </BaseView>
  );
}

BlockLink.propTypes = propTypes;
BlockLink.contextTypes = contextTypes;
BlockLink.defaultProps = defaultProps;

export default BlockLink;
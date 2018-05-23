import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';
import { action, formatChildren } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  raw: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  raw: false,
};

function BlockLink(props, context) {
  const { children, raw, ...elementProps } = props;

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseView {...linkProps} className="">
      {formatChildren(children, raw)}
    </BaseView>
  );
}

BlockLink.propTypes = propTypes;
BlockLink.contextTypes = contextTypes;
BlockLink.defaultProps = defaultProps;

export default BlockLink;

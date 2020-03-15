import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../utils/rnw-compat/BaseTouchable';
import useActionElement from '../hooks/useActionElement';
import ActionPropTypes from '../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
};

const BlockLink = React.forwardRef(function BlockLink(props, ref) {
  const createElement = useActionElement(BaseTouchable, props, ref);

  return createElement({ tag: 'a' });
});

BlockLink.displayName = 'BlockLink';
BlockLink.propTypes = propTypes;

export default BlockLink;

import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  ...action.defaultProps,
};

const BlockLink = React.forwardRef(function BlockLink(props, ref) {
  const createElement = useActionElement(BaseTouchable, props, ref);

  return createElement({ tag: 'a' });
});

BlockLink.propTypes = propTypes;
BlockLink.defaultProps = defaultProps;

export default BlockLink;

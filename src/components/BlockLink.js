import React from 'react';
import PropTypes from 'prop-types';
import BaseTouchable from '../utils/rnw-compat/BaseTouchable';
import { applyDisabled } from '../utils/states';
import useAction from '../hooks/useAction';
import ActionPropTypes from '../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const BlockLink = React.forwardRef(function BlockLink(props, ref) {
  const { disabled = false, active, ...elementProps } = props;

  const actionProps = useAction(elementProps, ref);

  return (
    <BaseTouchable
      {...applyDisabled(actionProps, disabled)}
      essentials={{ tag: 'a' }}
    />
  );
});

BlockLink.displayName = 'BlockLink';
BlockLink.propTypes = propTypes;

export default BlockLink;

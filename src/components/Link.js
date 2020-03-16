import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../utils/rnw-compat/BaseText';
import useAction from '../hooks/useAction';
import ActionPropTypes from '../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
};

const Link = React.forwardRef(function Link(props, ref) {
  const { ...elementProps } = props;

  const actionProps = useAction(elementProps, ref);

  return <BaseText {...actionProps} essentials={{ tag: 'a' }} />;
});

Link.displayName = 'Link';
Link.propTypes = propTypes;

export default Link;

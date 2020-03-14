import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
import useActionElement from '../../hooks/useActionElement';
import { actionPropTypes } from '../../utils/props';

const propTypes = {
  ...actionPropTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
};

const Link = React.forwardRef(function Link(props, ref) {
  const createElement = useActionElement(BaseText, props, ref);

  return createElement({ tag: 'a' });
});

Link.displayName = 'Link';
Link.propTypes = propTypes;

export default Link;

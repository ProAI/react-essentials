import React from 'react';
import PropTypes from 'prop-types';
import BaseText from '../../utils/rnw-compat/BaseText';
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

const Link = React.forwardRef(function Link(props, ref) {
  const createElement = useActionElement(BaseText, props, ref);

  return createElement({ tag: 'a' });
});

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;

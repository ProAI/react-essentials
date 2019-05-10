import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import { COLORS } from '../../utils/constants';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
};

const ActionBadge = React.forwardRef(function ActionBadge(props, ref) {
  const { color, ...elementProps } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  const createElement = useActionElement(BaseTouchable, elementProps, ref);

  return createElement({
    className: classes,
  });
});

ActionBadge.propTypes = propTypes;
ActionBadge.defaultProps = defaultProps;

export default ActionBadge;

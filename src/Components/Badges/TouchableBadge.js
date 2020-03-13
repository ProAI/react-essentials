import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import { COLORS } from '../../utils/constants';
import { actionPropTypes, actionDefaultProps } from '../../utils/props';

const propTypes = {
  ...actionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  ...actionDefaultProps,
  color: 'primary',
};

const TouchableBadge = React.forwardRef(function TouchableBadge(props, ref) {
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

TouchableBadge.displayName = 'TouchableBadge';
TouchableBadge.propTypes = propTypes;
TouchableBadge.defaultProps = defaultProps;

export default TouchableBadge;

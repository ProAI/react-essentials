import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useActionElement from '../../hooks/useActionElement';
import { COLORS } from '../../utils/constants';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const TouchableBadge = React.forwardRef(function TouchableBadge(props, ref) {
  const { color = 'primary', ...elementProps } = props;

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

export default TouchableBadge;

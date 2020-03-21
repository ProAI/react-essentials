import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import useAction from '../../hooks/useAction';
import { COLORS } from '../../utils/constants';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const TouchableBadge = React.forwardRef(function TouchableBadge(props, ref) {
  const { color = 'primary', ...elementProps } = props;

  const actionProps = useAction(elementProps, ref);

  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return <BaseTouchable {...actionProps} essentials={{ className: classes }} />;
});

TouchableBadge.displayName = 'TouchableBadge';
TouchableBadge.propTypes = propTypes;

export default TouchableBadge;
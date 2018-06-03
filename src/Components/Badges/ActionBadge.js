import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseTouchable } from '../../utils/components';
import { COLORS } from '../../utils/constants';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
};

function ActionBadge(props, context) {
  const { children, color, ...elementProps } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseTouchable {...linkProps} className={classes}>
      {children}
    </BaseTouchable>
  );
}

ActionBadge.propTypes = propTypes;
ActionBadge.contextTypes = contextTypes;
ActionBadge.defaultProps = defaultProps;

export default ActionBadge;

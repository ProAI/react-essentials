import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseTouchable } from '../../utils/components';
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

function ActionBadge(props) {
  const { children, color, ...elementProps } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  const linkProps = action.createLinkProps(elementProps);

  return (
    <BaseTouchable {...linkProps} className={classes}>
      {children}
    </BaseTouchable>
  );
}

ActionBadge.propTypes = propTypes;
ActionBadge.defaultProps = defaultProps;

export default ActionBadge;

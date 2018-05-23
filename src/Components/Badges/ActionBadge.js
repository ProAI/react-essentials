import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { COLORS } from '../../utils/constants';
import { action, formatChildren } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
  raw: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  raw: false,
};

function ActionBadge(props, context) {
  const {
    children, color, raw, ...elementProps
  } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  const linkProps = action.createLinkProps(elementProps, context);

  return (
    <BaseView {...linkProps} className={classes} inlineOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

ActionBadge.propTypes = propTypes;
ActionBadge.contextTypes = contextTypes;
ActionBadge.defaultProps = defaultProps;

export default ActionBadge;

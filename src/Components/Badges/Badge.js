import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import { COLORS } from '../../utils/constants';
import { formatChildren } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
  raw: PropTypes.bool,
};

const defaultProps = {
  color: 'primary',
  raw: false,
};

function Badge({
  children, color, raw, ...elementProps
}) {
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return (
    <BaseView props={elementProps} className={classes} inlineOnly>
      {formatChildren(children, raw)}
    </BaseView>
  );
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;

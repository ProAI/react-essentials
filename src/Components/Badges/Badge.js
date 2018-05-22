import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView, BaseText } from '../../utils/components';
import { COLORS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  color: 'primary',
};

function Badge({ children, color, ...elementProps }) {
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return (
    <BaseView props={elementProps} className={classes} inlineOnly>
      <BaseText className="" blockOnly>
        {children}
      </BaseText>
    </BaseView>
  );
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;

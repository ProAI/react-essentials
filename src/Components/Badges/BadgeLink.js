import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { COLORS } from '../../utils/constants';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  variant: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  ...action.defaultProps,
  variant: 'primary',
};

function BadgeLink(props, context) {
  const { variant, ...otherProps } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${variant}`,
  );

  const linkProps = action.createLinkProps(otherProps, context);

  return <BaseText {...linkProps} className={classes} inlineOnly />;
}

BadgeLink.propTypes = propTypes;
BadgeLink.defaultProps = defaultProps;

export default BadgeLink;

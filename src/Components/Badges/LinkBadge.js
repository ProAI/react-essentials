import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { COLORS } from '../../utils/constants';
import { createLinkProps } from '../../utils';

const propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(COLORS),
  external: PropTypes.bool,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
};

const defaultProps = {
  to: null,
  onClick: null,
  variant: 'primary',
  external: false,
  preventToggle: false,
  keepFocus: false,
};

function LinkBadge(props, context) {
  const {
    variant, to, external, onClick, preventToggle, keepFocus, ...otherProps
  } = props;
  const classes = cx(
    // constant classes
    'badge',
    `badge-${variant}`,
  );

  const linkProps = createLinkProps(props, context);

  return <BaseText {...otherProps} {...linkProps} className={classes} inlineOnly />;
}

LinkBadge.propTypes = propTypes;
LinkBadge.defaultProps = defaultProps;

export default LinkBadge;

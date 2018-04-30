import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TEXT_COLORS, UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['lead', 'blockquote']),
  color: PropTypes.oneOf(TEXT_COLORS),
  align: PropTypes.oneOf(['justify', 'left', 'center', 'right']),
  mark: PropTypes.bool,
  small: PropTypes.bool,
  underline: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  variant: null,
  align: null,
  color: null,
  mark: false,
  small: false,
  underline: false,
  bold: false,
  italic: false,
  class: null,
  style: null,
};

function Text({
  children,
  variant,
  align,
  color,
  mark,
  small,
  underline,
  bold,
  italic,
  class: utils,
  style,
}) {
  const classes = cx(
    // variable classes
    color && `text-${color}`,
    align && `text-${align}`,
    variant === 'lead' && 'lead',
    variant === 'blockquote' && 'blockquote',
    mark && 'mark',
    small && 'small',
    // util classes
    utils.join(' '),
  );

  // wrap children with underline, bold and italic tags
  const childrenWithU = underline ? <u>{children}</u> : children;
  const childrenWithUB = bold ? <strong>{childrenWithU}</strong> : childrenWithU;
  const childrenWithUBI = italic ? <em>{childrenWithUB}</em> : childrenWithUB;

  return (
    <span className={classes} style={style}>
      {childrenWithUBI}
    </span>
  );
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;

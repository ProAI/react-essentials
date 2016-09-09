import React, { PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ]),
};

const defaultProps = {
  variant: 'default',
};

function Tag({ variant, className, ...attributes }) {
  const classes = classNames([
    'tag',
    `tag-${variant}`,
    className,
  ]);

  return (
    <span {...attributes} className={classes} />
  );
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;

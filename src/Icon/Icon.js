import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function Icon({ name, className, ...attributes }) {
  const classes = classNames([
    'icon',
    `icon-${name}`,
    className,
  ]);

  return (
    <i {...attributes} className={classes} />
  );
}

Icon.propTypes = propTypes;

export default Icon;

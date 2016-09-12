import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function Icon({ name, className, ...attributes }) {
  const classes = cx(
    'icon',
    `icon-${name}`,
    className,
  );

  return (
    <i {...attributes} className={classes} />
  );
}

Icon.propTypes = propTypes;

export default Icon;

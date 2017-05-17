import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function Icon({ name, className, ...attributes }) {
  const classes = cx('icon', `icon-${name}`, className);

  return <i {...attributes} className={classes} />;
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;

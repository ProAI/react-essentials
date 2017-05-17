import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
};

const defaultProps = {
  className: null,
  variant: 'default',
};

function Tag({ variant, className, ...attributes }) {
  const classes = cx('tag', `tag-${variant}`, className);

  return <span {...attributes} className={classes} />;
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;

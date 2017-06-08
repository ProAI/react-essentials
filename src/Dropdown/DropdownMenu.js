import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  triggerId: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
};

function DropdownMenu({ className, triggerId, ...attributes }) {
  const classes = cx('dropdown-menu', className);

  return <div {...attributes} className={classes} aria-labelledby={triggerId} />;
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;

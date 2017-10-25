import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function DropdownMenuItem({ children, className, ...attributes }) {
  const classes = cx('dropdown-item', className);

  return (
    <a {...attributes} className={classes}>
      {children}
    </a>
  );
}

DropdownMenuItem.propTypes = propTypes;
DropdownMenuItem.defaultProps = defaultProps;

export default DropdownMenuItem;

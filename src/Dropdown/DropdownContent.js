import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function DropdownContent({ className, ...attributes }) {
  const classes = cx(
    'dropdown-content',
    className,
  );

  return (
    <div {...attributes} className={classes} />
  );
}

DropdownContent.propTypes = propTypes;
DropdownContent.defaultProps = defaultProps;

export default DropdownContent;

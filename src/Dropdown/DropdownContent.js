import React, { PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
};

function DropdownContent({ className, ...attributes }) {
  const classes = classNames([
    'dropdown-content',
    className,
  ]);

  return (
    <div {...attributes} className={classes} />
  );
}

DropdownContent.propTypes = propTypes;

export default DropdownContent;

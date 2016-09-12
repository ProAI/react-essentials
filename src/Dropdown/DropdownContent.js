import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
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

export default DropdownContent;

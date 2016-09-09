import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function FormTitle({ children, className, ...attributes }) {
  const classes = classNames([
    'form-title',
    className,
  ]);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormTitle.propTypes = propTypes;

export default FormTitle;

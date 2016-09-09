import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function FormFooter({ children, className, ...attributes }) {
  const classes = classNames([
    'form-footer',
    className,
  ]);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormFooter.propTypes = propTypes;

export default FormFooter;

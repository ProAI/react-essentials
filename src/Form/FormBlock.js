import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function FormBlock({ children, className, ...attributes }) {
  const classes = classNames([
    'form-block',
    className,
  ]);

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormBlock.propTypes = propTypes;

export default FormBlock;

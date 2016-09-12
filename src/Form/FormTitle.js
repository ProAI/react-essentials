import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function FormTitle({ children, className, ...attributes }) {
  const classes = cx(
    'form-title',
    className,
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormTitle.propTypes = propTypes;

export default FormTitle;

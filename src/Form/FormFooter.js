import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function FormFooter({ children, className, ...attributes }) {
  const classes = cx(
    'form-footer',
    className,
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormFooter.propTypes = propTypes;
FormFooter.defaultProps = defaultProps;

export default FormFooter;

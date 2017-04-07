import React, { PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function FormBlock({ children, className, ...attributes }) {
  const classes = cx(
    'form-block',
    className,
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
}

FormBlock.propTypes = propTypes;
FormBlock.defaultProps = defaultProps;

export default FormBlock;

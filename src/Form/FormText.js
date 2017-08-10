import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'black',
    'muted',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'white',
  ]),
  className: PropTypes.string,
};

const defaultProps = {
  variant: 'black',
  className: null,
};

function FormText({ children, variant, className }) {
  const classes = cx('form-text', className, `text-${variant}`);

  return (
    <p className={classes}>
      {children}
    </p>
  );
}

FormText.propTypes = propTypes;
FormText.defaultProps = defaultProps;

export default FormText;

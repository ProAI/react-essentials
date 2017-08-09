import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

function FormText({ children, className }) {
  const classes = cx('form-text', className);

  return (
    <p className={classes}>
      {children}
    </p>
  );
}

FormText.propTypes = propTypes;
FormText.defaultProps = defaultProps;

export default FormText;

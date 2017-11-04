import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

function FormResetButton({ children, ...props }, { formik }) {
  return (
    <Button disabled={!formik.dirty || formik.isSubmitting} onClick={formik.handleReset} {...props}>
      {children}
    </Button>
  );
}

FormResetButton.propTypes = propTypes;
FormResetButton.contextTypes = contextTypes;

export default FormResetButton;

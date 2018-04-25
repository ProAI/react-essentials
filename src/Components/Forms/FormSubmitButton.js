import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

function FormSubmitButton({ children, ...props }, { formik }) {
  return (
    <Button disabled={formik.isSubmitting} type="submit" {...props}>
      {children}
    </Button>
  );
}

FormSubmitButton.propTypes = propTypes;
FormSubmitButton.contextTypes = contextTypes;

export default FormSubmitButton;

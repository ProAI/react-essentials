import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

function FormResetButton({ ...otherProps }, { formik }) {
  return (
    <Button
      {...otherProps}
      disabled={!formik.dirty || formik.isSubmitting}
      onClick={formik.handleReset}
    />
  );
}

FormResetButton.contextTypes = contextTypes;

export default FormResetButton;

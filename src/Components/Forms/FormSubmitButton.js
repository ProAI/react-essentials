import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

function FormSubmitButton({ ...otherProps }, { formik }) {
  return <Button {...otherProps} disabled={formik.isSubmitting} type="submit" />;
}

FormSubmitButton.contextTypes = contextTypes;

export default FormSubmitButton;

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import TextField from './TextField';
// import SelectField from './SelectField';
// import FileUploadField from './FileUploadField';
import RadioButtonGroup from './RadioButtonGroup';
// import CheckboxField from './CheckboxField';

const propTypes = {
  type: PropTypes.oneOf([
    'text',
    'select',
    'radio',
    'checkbox',
    'file',
  ]),
};

function FormField({ type, ...attributes }) {
  let component;

  if (type === 'text') {
    component = TextField;
  /* } else if (type === 'select') {
    component = SelectField;
  } else if (type === 'file') {
    component = FileUploadField;*/
  } else if (type === 'radio') {
    component = RadioButtonGroup;
  } /* else if (type === 'checkbox') {
    component = CheckboxField;
  }*/

  return (
    <Field {...attributes} component={component} />
  );
}

FormField.propTypes = propTypes;

export default FormField;

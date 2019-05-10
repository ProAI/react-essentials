import React from 'react';
import { Field as FormikField } from 'formik';

export default function withFormField(Component) {
  return React.forwardRef((props, ref) => {
    return <FormikField {...props} fieldRef={ref} component={Component} />;
  });
}

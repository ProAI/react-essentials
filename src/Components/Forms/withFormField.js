import React from 'react';
import { Field as FormikField } from 'formik';

export default function withFormField(Component) {
  const callback = (props, ref) => {
    return <FormikField {...props} fieldRef={ref} component={Component} />;
  };

  callback.displayName = Component.name;

  return React.forwardRef(callback);
}

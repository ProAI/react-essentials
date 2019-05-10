import React from 'react';

export default function withFormField(Component, statics) {
  const WrappedComponent = React.forwardRef((props, ref) => {
    return <Component {...props} innerRef={ref} />;
  });

  if (statics) {
    statics.forEach(value => {
      WrappedComponent[value] = Component[value];
    });
  }

  return WrappedComponent;
}
